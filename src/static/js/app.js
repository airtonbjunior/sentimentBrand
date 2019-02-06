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
			document.getElementById("btn-search-icon").className += " fa fa-spinner fa-spin";
        	document.getElementById("bar-chart").className = "hide-load";
    	},
		data: {'topic': topic, 'quantity': quantity},
		success: function(response) {
			//alert(response);
			renderTweets(response);
			renderGraph(response);
			//document.getElementById("loading").className += " hide-load";
			document.getElementById("wrapper-all-result").classList.remove("hidden");
			document.getElementById("loading-icon").className    = "hide-load";
			document.getElementById("btn-search-icon").className = "btn-search-icon hide-load";
			$("#content-time-ajax").text(response.tweets_list)
			$("#summary-desc-pos").text(pos)
			$("#summary-desc-neg").text(neg)
			$("#summary-desc-neu").text(neu)
		}, 
		error: function(error) {
			console.log("Fail on ajax call")
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


var pos = 0,
	neg = 0,
	neu = 0

function renderTweets(tweets) {

	tweets_html = ""

	pos = 0
	neg = 0
	neu = 0

	tweets.forEach(function(x) {
		classColor = ""
		if (x.sentiment_score > 0) {
			pos++;
			classColor = "tweet-positive";
		}
		else if (x.sentiment_score < 0) {
			neg++;
			classColor = "tweet-negative";
		}
		else {
			neu++;
			classColor = "tweet-neutral";
		}
		

		tweets_html += "<div class='tweet-on-list " + classColor + "'>" + x.text + "</div><br/>"
		//alert(x.text);
	})

	$(".tweets-list").html(tweets_html)
}


function renderGraph(tweets) {
	var sentiment_score = []

	console.log(tweets)
	//infos = tweets.pop(); // get last index (infos about the ajax call)
	//console.log(tweets)
	//console.log(infos)

	tweets.forEach(function(x) {
		sentiment_score.push(x.sentiment_score);

	})

	console.log(sentiment_score)

	new Chart(document.getElementById("bar-chart"), {
	    type: 'doughnut',
	    responsive: true,
	    data: {
	    	labels: ['positive', 'negative', 'neutral'],
	      	datasets: [
	        {
	          data: [pos, neg, neu], 
	          backgroundColor: ["#84b9ef", "#ff5d5d", "#fbe4c9"],
	          //borderColor: "red"
	          //fill: false
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