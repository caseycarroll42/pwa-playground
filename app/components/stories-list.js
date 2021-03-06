'use strict'

class StoriesList extends HTMLElement {

	constructor() {
		super()
		this.stories = null
		this.filteredStories = new Array ()

		//create a shadow root with open encapsulation
		this.shadow = this.attachShadow({mode: 'open'})
		this.shadow.innerHTML = '<style>' +
		'ol { list-style-type:none; padding-left: 0px; }' +
		'li { background-color: white; padding: 8px; border-style: solid; border-top-style: none; border-right-style: none; border-left-style: none; border-bottom: thin solid rgba(12, 12, 12, 0.16); }' +
		'</style>';

		let storyList = document.createElement('ol')
		storyList.id = "stories-list"
		this.shadow.appendChild(storyList)
		this.addEventListener('filter-changed', this.onFilterChanged)
	}

	//query stories from mongodb
	_fetchStories() {
		fetch('/stories').then(
			response => {
				return response.json()
			}).then(
			stories => {
				this.stories = stories
				this._initDisplayStories()
			})
	}

	onFilterChanged(query) {
		let searchVal = query.detail

		this.stories.forEach(function(story) {
			let storyTitle = JSON.stringify(story.title)
			//if we find a matching story
			if(storyTitle.indexOf(searchVal) != -1) {
				//check to make sure story isn't already in the list
				if(this.filteredStories.indexOf(story) == -1) {
					//add the queried story to the list
					this.filteredStories.push(story)
				}
			} else {
				let index = this.filteredStories.indexOf(story)
				if(index != -1) {
					this.filteredStories.splice(index, 1)
				}
			}
		}, this);

		this._updateStoriesList()
	}

	connectedCallback() {
		this._fetchStories()
	}

	_initDisplayStories() {
		var storyList = this.shadow.querySelector('#stories-list')
		this.stories.forEach(function(story) {
			var story_entry = document.createElement('li')
			story_entry.innerHTML = JSON.stringify(story.title)
			storyList.appendChild(story_entry)
		}, this);
	}

	_updateStoriesList() {
		var storyList = this.shadow.querySelector("#stories-list")
		var range = document.createRange();
    	range.selectNodeContents(storyList);
    	range.deleteContents();

		this.filteredStories.forEach(function(story) {
			var story_entry = document.createElement('li')
			story_entry.innerHTML = JSON.stringify(story.title)
			storyList.appendChild(story_entry)
		}, this);
	}
}

window.customElements.define('stories-list', StoriesList)