'use strict'

class StoriesList extends HTMLElement {

	constructor() {
		super()

		this.stories = "test"
		
		//create a shadow root with open encapsulation
		this.shadow = this.attachShadow({mode: 'open'})
		
		//dummy code to show element works
		var dummyText = document.createElement('span')
		dummyText.textContent = "I'm alive!!!"
		this.shadow.appendChild(dummyText)

		let storyList = document.createElement('ol')
		storyList.id = "stories-list"
		this.shadow.appendChild(storyList)
	}

	//query stories from mongodb
	_fetchStories() {

		fetch('/stories').then(
			response => {
				return response.json()
			}).then(
			stories => {
				var storyList = this.shadow.querySelector("#stories-list")
				stories.forEach(function(story) {
					var story_entry = document.createElement('li')
					story_entry.innerHTML = JSON.stringify(story.a)
					storyList.appendChild(story_entry)
				}, this);
			})
	}

	connectedCallback() {
		this._fetchStories()
	}
}

window.customElements.define('stories-list', StoriesList)