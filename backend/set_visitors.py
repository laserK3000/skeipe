import boto3
import json
import time
import decimal
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)

def set_visitors(kneipen_id, visitors):
    dynamodb = boto3.resource("dynamodb", region_name='eu-central-1')
    table = dynamodb.Table('geo-data')
    
    response = table.get_item(Key={'id': kneipen_id})
    item = response['Item']
    
    item['last_update'] = int(time.time())
    
    item['visitors'] = visitors

    table.put_item(Item=item)
    
    return {"ok": True}
    

def lambda_handler(event, context):
    try:
        return response(set_visitors(event['body']['id'], event['body']['visitors']) , 200)
    except Exception as e:
        return response('Error', 400)

def response(message, status_code):
    return {
        "statusCode": status_code,
        "headers": {
            "X-Bier": "gerne doch",
            "Access-Control-Allow-Origin": "*" 
        },
        "body": json.dumps(message, cls=DecimalEncoder),
        "isBase64Encoded": False
    }