/*

*/

function searchFn() {
	content = document.getElementById("search-input").value
	
	if (content.length == 0) {
		alert("Type some topic")
		return
	}

	alert("I'll search about " + content)
}
