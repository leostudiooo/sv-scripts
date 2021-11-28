import sys
import re

if sys.argv[2]:
    outputFile = open(sys.argv[2], "w", encoding="utf-8")
else:
    outputFile = open(sys.argv[1]+"- Transferred.UST", "w", encoding="utf-8")

with open(sys.argv[1], "r", encoding="shift-jis") as inputFile:
    for ln in inputFile:
        outputFile.write(re.sub(r"^Lyric=\S{1} ", "Lyric=", ln))

outputFile.close()
