"""
	SentimentBrand
	<date>	2 feb 2019
	<author>	Airton B Jr
	<email>	airtonbjunior@gmail.com

	TO-DO: describe the file
"""
import vars as var


def getCredentials(secret_file_path):
	"""
	"""
	print("[LOG][Getting the credentials]")
	with open(secret_file_path, 'r') as f:
		for line in f:
			var.CREDENTIALS[line.split('\t')[0].strip()] = line.split('\t')[1].strip()


