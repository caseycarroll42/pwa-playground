class StoriesList extends HTMLElement {
	constructor() {
		super()
		//create a shadow root with open encapsulation
		var shadow = this.attachShadow({mode: 'open'})

		var dummyText = document.createElement('span')
		dummyText.textContent = "I'm alive!!!"
		
		shadow.appendChild(dummyText)
	}

}

window.customElements.define('stories-list', StoriesList)