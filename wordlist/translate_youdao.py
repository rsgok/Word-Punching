import json
import sys
import uuid
import requests
import hashlib
import time

YOUDAO_URL = 'https://openapi.youdao.com/api'
APP_KEY = '2ca1937c2da1aa06'
APP_SECRET = '76EpsMO00ub7UaPLtzgmqMj7tgTYsOCY'


def encrypt(signStr):
    hash_algorithm = hashlib.sha256()
    hash_algorithm.update(signStr.encode('utf-8'))
    return hash_algorithm.hexdigest()


def truncate(q):
    if q is None:
        return None
    size = len(q)
    return q if size <= 20 else q[0:10] + str(size) + q[size - 10:size]


def do_request(data):
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    return requests.post(YOUDAO_URL, data=data, headers=headers)


def connect(q):
    data = {}
    data['from'] = 'en'
    data['to'] = 'zh-CHS'
    data['signType'] = 'v3'
    curtime = str(int(time.time()))
    data['curtime'] = curtime
    salt = str(uuid.uuid1())
    signStr = APP_KEY + truncate(q) + salt + curtime + APP_SECRET
    sign = encrypt(signStr)
    data['appKey'] = APP_KEY
    data['q'] = q
    data['salt'] = salt
    data['sign'] = sign

    response = do_request(data).json()
    meaning = json.dumps(response['basic']['explains'], ensure_ascii=False)
    if 'us-phonetic' in response['basic']:
        phonetic = response['basic']['us-phonetic']
    else:
        phonetic = ""
    if 'web' in response:
        phrase = json.dumps(response['web'], ensure_ascii=False)
    else:
        phrase = ""
    return meaning, phonetic, phrase


if __name__ == '__main__':
    meaning, phonetic, phrase = connect('in spite of')
    
    print(type(meaning))
    print(type(phonetic))
    print(type(phrase))
    print(meaning)
    print(phonetic)
    print(phrase)

# useful info
###
# basic:explains 单词解释
# basic:us-phonetic 美式发音
# web 网络释义，短语
###