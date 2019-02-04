/*

*/

startPage()

function startPage() {
	window.onload = function() {
		document.getElementById("search-input").focus();
	};

	document.getElementById("search-input")
	.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("btn-search").click();
		}
	});

	document.getElementById("quantity-input")
	.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("btn-search").click();
		}
	});
}

//var $loading = $('#loading-div').hide();

function getData(topic, quantity) {
	$.ajax({
		type: "GET", 
		dataType: "json", 
		url: "/get_tweets",
		async: true,
		beforeSend: function() {
        	document.getElementById("loading").classList.remove("hide-load");
    	},
		data: {'topic': topic, 'quantity': quantity},
		success: function(response) {
			//alert(response);
			renderTweets(response);
			document.getElementById("loading").className += " hide-load";
			//document.getElementById("wrapper").className += " wrapper-all-result";
			//document.getElementById("wrapper").classList.remove("wrapper-all");
			$("#content-time-ajax").text(response.tweets_list)
		}, 
		error: function(error) {
			console.log("argh!")
			console.log(error);
		}, 
	});
}


function searchFn() {
	topic    = document.getElementById("search-input").value
	quantity = document.getElementById("quantity-input").value

	if (topic.length == 0) {
		return
	}

	getData(topic, quantity);
}


function renderTweets(tweets) {

	tweets_html = ""

	tweets.forEach(function(x){
		tweets_html += "<div class='tweet-on-list'>" + x.text + "</div><br/>"
		//alert(x.text);
	})

	$(".tweets").html(tweets_html)
}