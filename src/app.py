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
	
	print(str(request.args['topic']))
	print(str(request.args['quantity']))

	return json.dumps(tweets)
	#return jsonify({'data': render_template('index2.html', tweets_list=tweets)})


if __name__ == '__main__':
    app.run(debug=True)