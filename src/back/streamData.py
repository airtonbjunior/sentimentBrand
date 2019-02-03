"""
	SentimentBrand
	<date>	2 feb 2019
	<author>	Airton B Jr
	<email>	airtonbjunior@gmail.com

	TO-DO: describe the file
"""
import vars as var
from streamListener import *
import tweepy

def getCredentials(secret_file_path):
	"""
		TO-DO: documentation
	"""
	print("[LOG][Getting the credentials]")
	with open(secret_file_path, 'r') as f:
		for line in f:
			var.CREDENTIALS[line.split('\t')[0].strip()] = line.split('\t')[1].strip()[1:-1]

	print("[LOG][Credentials loaded]")


def logonAPI():
	"""
		TO-DO: documentation
	"""
	print("[LOG][Logging on Twitter API]")
	getCredentials('../../credentials.secret')
	auth = tweepy.OAuthHandler(var.CREDENTIALS['consumerKey'], var.CREDENTIALS['consumerSecret'])
	auth.set_access_token(var.CREDENTIALS['accessToken'], var.CREDENTIALS['accessTokenSecret'])

	print("[LOG][Logged in]")
	var.API = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)


def searchTopic(topic, items):
	print("[LOG][Searching for '{}' with limit of {} items]".format(topic, items))
	return tweepy.Cursor(var.API.search, q="abc").items(items)


def streamTopic(topic):
	print("[LOG][Tracking data about '{}']".format(topic))
	stream_listener = StreamListener()
	stream = tweepy.Stream(auth=var.API.auth, listener=stream_listener)
	stream.filter(track=[topic])