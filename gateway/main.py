import sys
import time
import random
import datetime
import serial . tools . list_ports
import pytz
import pymongo
from Adafruit_IO import MQTTClient
from Adafruit_IO import Client

# from getFeedData import *
import pymongo 

client = pymongo.MongoClient(
    'mongodb+srv://hunghoang:hunghoang@cluster0.xrb3qu6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
db = client["device"]
# collection1 = db['fan']
collection2 = db['led']
# collection3 = db['ledcolor']
collection4 = db['lightsensor']
collection5 = db['tempsensor']
collection6 = db['humisensor']
# collection7 = db['assistant']
# collection8 = db["thieftcontrol"]
collection10 = db["activity"]
AIO_FEED_IDs = ["smarthome.led","smarthome.ledcolor","smarthome.fan", "smarthome.doorcontrol","smarthome.thieftcontrol"]
AIO_USERNAME = "minhhieu181020"
AIO_KEY = "aio_PILC086As7vMguglwAIwbvAZdKL0"
aio = Client(AIO_USERNAME, AIO_KEY)
FEED_KEYS = ['smarthome.tempsensor', 'smarthome.lightsensor','smarthome.humisensor']  
def safe_convert_to_float(value):
    try:
        # Try converting to float
        return float(value)
    except ValueError:
        # Return original string if conversion fails
        return value
def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)
        print("Connecting to topic " + topic)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)
def fetch_sensor_data(feed_key):
    data = aio.receive(feed_key)
    data_structure = {
        "id": data.id,
        "value": safe_convert_to_float(data.value),
        "feed_id": data.feed_id,
        "feed_key": feed_key,
        "created_at":  datetime.datetime.utcnow(),
    } 
    print(data_structure)
    # if "fan" in data_structure["feed_key"]:
    #     collection1.insert_one(data_structure)

    # if "led" in data_structure["feed_key"]:
    #     collection2.insert_one(data_structure)
    # if "ledcolor" in data_structure["feed_key"]:
    #     collection3.insert_one(data_structure)
    if "lightsensor" in data_structure["feed_key"]:
        collection4.insert_one(data_structure)
    if "tempsensor" in data_structure["feed_key"]:
        collection5.insert_one(data_structure)
    if "humisensor" in data_structure["feed_key"]:
        collection6.insert_one(data_structure)
    # if "assistant" in data_structure["feed_key"]:
    #     collection7.insert_one(data_structure)
    
def message(client , feed_id , payload):
    if(feed_id == "smarthome.led" or feed_id == "smarthome.thieftcontrol" or feed_id == "smarthome.fan" or feed_id == "smarthome.ledcolor" or feed_id == "smarthome.doorcontrol"):
        print("Nhan du lieu: " + payload + " , feed_id: " + feed_id, "created_at: " + str(datetime.datetime.utcnow()) )
        if feed_id == "smarthome.led":
            collection10.insert_one({"feed_id": feed_id, "value": payload, "created_at": datetime.datetime.utcnow()})
        if feed_id == "smarthome.ledcolor":
            collection10.insert_one({"feed_id": feed_id, "value": payload,"created_at": datetime.datetime.utcnow() })
        if feed_id == "smarthome.fan":
            collection10.insert_one({"feed_id": feed_id, "value": payload, "created_at": datetime.datetime.utcnow()})
            # collection1.insert_one({"feed_id": feed_id, "value": payload, "created_at": datetime.datetime.utcnow()})
        if feed_id == "smarthome.doorcontrol":
            collection10.insert_one({"feed_id": feed_id, "value": payload,"created_at": datetime.datetime.utcnow()})
        if feed_id == "smarthome.thieftcontrol":
            collection10.insert_one({"feed_id": feed_id, "value": payload,"created_at": datetime.datetime.utcnow()})
        if feed_id == "smarthome.lightsensor":
            collection4.insert_one({"feed_id": feed_id, "value": safe_convert_to_float(payload),"created_at": datetime.datetime.utcnow()})
        if feed_id == "smarthome.tempsensor":
            collection5.insert_one({"feed_id": feed_id, "value": payload,"created_at": datetime.datetime.utcnow()})
        if feed_id == "smarthome.humisensor":
            collection6.insert_one({"feed_id": feed_id, "value": payload,"created_at": datetime.datetime.utcnow()})


client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()
counter = 10
sensorType = 0 #send sensor's data to server sequentially, use SWITCH CASE
while True:
    # counter = counter -1
    # if counter <= 0:
    #     #send data to server with 10s interval
    #     print("Random data is published to server")
    #     counter = 10
    #     temp = random.randint(10,40)
    #     client.publish("sensor1"  ,temp)
    #     light = random.randint(100,500)
    #     client.publish("sensor2"  ,light)
    
    # time.sleep(1)
    for feed_key in FEED_KEYS:
            fetch_sensor_data(feed_key)
    time.sleep(10)
    pass