import pymysql
import sys
import json

conn = pymysql.connect('localhost','root','root','word_punching')
cursor = conn.cursor()
sql = "insert into word (text, href, source) values ('%s','%s','%s') on duplicate key update source = CONCAT(source, ',%s')"


wordlist = sys.argv[1]
source = wordlist[:wordlist.index(".json")]
# print(source)
with open(wordlist, encoding='utf-8') as f:
    wordListData = json.load(f)
    listlen = len(wordListData)
    print("total num:",listlen)
    for item in wordListData:
        word = item['word']
        href = item['href']
        sqlnow = sql % (word, href, source, source)
        # print(sqlnow)
        cursor.execute(sqlnow)
conn.commit()
cursor.close()
conn.close()
