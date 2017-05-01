'use strict'

class SearchBar extends HTMLElement {

	constructor() {
		super()

		var searchInput = document.createElement('input')
		searchInput.id = "stories-filter"
		searchInput.placeholder = "Search"
		searchInput.setAttribute("role", "search")
		this.appendChild(searchInput)
		
		var storiesList = document.querySelector('stories-list')
		searchInput.addEventListener('input', event => {
			let changeFilterEvent = new CustomEvent('filter-changed', {'detail': event.target.value});
			storiesList.dispatchEvent(changeFilterEvent)
		})
	}
}

window.customElements.define('search-bar', SearchBar)