import boto3
import json
import decimal
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)

def get_kneipen(lat, long, distance):
    dynamodb = boto3.resource("dynamodb", region_name='eu-central-1')
    
    table = dynamodb.Table('geo-data')
    fe = Key('lat').between(Decimal(lat) - Decimal(distance), Decimal(lat) + Decimal(distance))
    fe2 = Key('long').between(Decimal(long) - Decimal(distance), Decimal(long) + Decimal(distance))
    
    response = table.scan(
            FilterExpression=fe & fe2,
            )

    return response["Items"]

def handler(event, context):
    try:
        return response(get_kneipen(event["queryStringParameters"]["lat"],event["queryStringParameters"]["long"],event["queryStringParameters"]["distance"]) , 200)
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