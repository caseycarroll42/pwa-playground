'use strict'

class StoriesList extends HTMLElement {

	constructor() {
		super()

		this.stories = null
		
		//create a shadow root with open encapsulation
		this.shadow = this.attachShadow({mode: 'open'})
		
		//dummy code to show element works
		var dummyText = document.createElement('span')
		dummyText.textContent = "I'm alive!!!"
		this.shadow.appendChild(dummyText)
	}

	//query stories from mongodb
	_fetchStories() {
		var fetched_stories;
		fetch('/stories').then(
			response => {
				response.json().then(
					data => {
						console.log(data)
					})
			})
	}

	connectedCallback() {
		this._fetchStories()
		
		let storyList = document.createElement('ol')
		storyList.id = "stories-list"
		this.shadow.appendChild(storyList)

		// this.stories.forEach(function(storyData) {
		// 	let story = document.createElement('li')
		// 	story.innerHTML = storyData
		// 	storyList.appendChild(story)
		// }, this);
	}
}

window.customElements.define('stories-list', StoriesList)