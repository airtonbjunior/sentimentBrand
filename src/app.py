from flask import Flask, render_template, jsonify, request
import time
import json
from streamData import *

app = Flask(__name__, template_folder='templates/')

@app.route('/')
def index():
	return render_template("index.html")


@app.route('/get_time')
def getTime():
	return jsonify(time.time())


@app.route('/get_tweets', methods=['GET','POST'])
def getTweets():

	tweets = searchTopic(str(request.args['topic']), int(request.args['quantity']))

	s = ""
	sentiments = []
	

	for tweet in tweets:
		s = str(getSentiment(tweet['text']))
		tweet['sentiment_score'] = s
		sentiments.append(s)
	
	#pos, neg, neu = countClasses(sentiments)

	#infos = {'pos': pos, 'neg': neg, 'neu': neu}

	#tweets.append(infos)

	print(str(request.args['topic']))
	print(str(request.args['quantity']))

	return json.dumps(tweets)
	#return jsonify({'data': render_template('index2.html', tweets_list=tweets)})


@app.route('/get_stream', methods=['GET', 'POST'])
def getStream():

	tweets = searchTopic(str(request.args['topic']), int(request.args['quantity']))

	s = ""
	sentiments = []	

	for tweet in tweets:
		s = str(getSentiment(tweet['text']))
		tweet['sentiment_score'] = s
		sentiments.append(s)

	return json.dumps(tweets)


def countClasses(polarities):
	pos, neg, neu = 0, 0, 0
	for m in polarities:
		if float(m) > 0:
			pos += 1
		elif float(m) < 0:
			neg += 1
		else:
			neu += 1

	return pos, neg, neu


if __name__ == '__main__':
    app.run(debug=True)