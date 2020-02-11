import pymysql
import json
from translate_youdao import connect as yd_translate

conn = pymysql.connect('localhost','root','root','word_punching')
cursor = conn.cursor()

sql = "select id,text from word where meaning is null order by id"
cursor.execute(sql)
res = cursor.fetchall()

sql = "update word set meaning='%s', phonetic='%s', phrase='%s' where id=%s"
count = 0
for item in res:
    meaning, phonetic, phrase = yd_translate(item[1])
    phonetic = pymysql.escape_string(phonetic)

    sqlnow = sql % (meaning, phonetic, phrase, item[0]) 
    # print(sqlnow)
    # print(item[1])
    cursor.execute(sqlnow)
    
    # 100 items per round
    count=count+1
    if(count == 100):
        count = 0
        conn.commit()
        print("complete 100 items...")

conn.commit()
cursor.close()
conn.close()

