"""
"""
import vars as var
from streamData import *

import tweepy

if __name__ == '__main__':
	logonAPI()
	streamTopic("python")
	#search_result = searchTopic("junior", 2)

	#for item in search_result:
	#	print(item)
		#print(item.text)