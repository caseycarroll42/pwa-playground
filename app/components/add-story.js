'use strict'

class AddStory extends HTMLElement {
	constructor() {
		super()
		console.log("add story is alive")
	}
}

window.customElements.define('add-story', AddStory)