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
        	document.getElementById("loading-icon").className += " fa fa-cog fa-spin fa-5x fa-fw";
        	$(".tweets-list").html("")
        	document.getElementById("bar-chart").className = "hide-load";
        	//document.getElementById("loading-icon").classList.remove("hide-load");
    	},
		data: {'topic': topic, 'quantity': quantity},
		success: function(response) {
			//alert(response);
			renderTweets(response);
			renderGraph(response);
			//document.getElementById("loading").className += " hide-load";
			document.getElementById("loading-icon").className = "hide-load";
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

	tweets.forEach(function(x) {
		classColor = ""
		if (x.sentiment > 0) {
			classColor = "tweet-positive";
		}
		else if (x.sentiment < 0) {
			classColor = "tweet-negative";
		}
		else {
			classColor = "tweet-neutral";
		}
		

		tweets_html += "<div class='tweet-on-list " + classColor + "'>" + x.text + "</div><br/>"
		//alert(x.text);
	})

	$(".tweets-list").html(tweets_html)
}


function renderGraph(tweets) {
	var sentiment_score = []
	tweets.forEach(function(x) {
		sentiment_score.push(x.sentiment);
	})

	console.log(sentiment_score)

	new Chart(document.getElementById("bar-chart"), {
	    type: 'line',
	    data: {
	      datasets: [
	        {
	          data: sentiment_score, 
	          label: "TextBlob", 
	          borderColor: "red", 
	          fill: false
	        }
	      ]
	    },
	    options: {
	      legend: { display: false },
	      title: {
	        display: true,
	        text: 'Sentiments score'
	      }
	    }
	});
}