'use strict'

class SearchBar extends HTMLElement {

	constructor() {
		super()

		//this.shadow = this.attachShadow({mode: 'open'})
		var searchInput = document.createElement('input')
		searchInput.id = "stories-filter"
		searchInput.placeholder = "Search"
		searchInput.setAttribute("role", "search")
		this.appendChild(searchInput)
		
		var changeFilterEvent = new Event('filter-changed');
		var storiesList = document.querySelector('stories-list')
		searchInput.addEventListener('input', event => {
			console.log(event.target.value)
			storiesList.dispatchEvent(changeFilterEvent)
		})
	}
}

window.customElements.define('search-bar', SearchBar)