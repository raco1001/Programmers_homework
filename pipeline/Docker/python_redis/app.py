import time
from os import environ as env
import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host=env["HOST"], port=env["PORT"])

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

def get_message():
    try:    
        with open('/msg/message.txt', 'r') as f:
            return f.readline().strip()
    except:
        return 'Hello world!'

@app.route('/')
def hello():
    message = get_message()
    count = get_hit_count()
    return '{} I have been seen {} times.\n'.format(message, count)
