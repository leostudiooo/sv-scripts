# coding=utf-8
# Written 22:15, Nov 28 2021, by Leo Li

import sys
import re

outputFile = open(sys.argv[2], "w", encoding="utf-8")
with open(sys.argv[1], "r", encoding="shift-jis") as inputFile:
	for ln in inputFile:
		outputFile.write(re.sub(r"^Lyric=\S{1} ", "Lyric=", ln))
outputFile.close()

