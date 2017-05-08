'use strict'

class AddStory extends HTMLElement {
	constructor() {
		super()
		console.log("add story is alive")
		this.shadow = this.attachShadow({mode: "open"})
		this.shadow.appendChild(this.storyForm())
	}

	storyForm() {
		let storyForm = document.createElement("form")
		storyForm.id = "new-story-form"
		storyForm.action = "add-story"
		return storyForm
	}
}

window.customElements.define('add-story', AddStory)