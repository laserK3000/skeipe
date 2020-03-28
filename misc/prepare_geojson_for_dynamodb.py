import json
import os

with open('Berlin_new.geojson', encoding='utf8') as json_file:
    data = json.load(json_file)
    dynamo_db_list = {"geo-data": []}
    for kneipe in data['features']:
        if "name" not in kneipe["properties"]:
            continue

        dyn_dict = {"PutRequest": {"Item": { 
                "id":            {"S" : kneipe["id"]},
                "name":          {"S" : kneipe["properties"]["name"]},
                "lat":           {"N" : str(kneipe["geometry"]["coordinates"][1])},
                "long":          {"N" : str(kneipe["geometry"]["coordinates"][0])}
            }}}

        if "opening_hours" in kneipe["properties"]:
            dyn_dict["PutRequest"]["Item"]["opening_hours"] = {"S" : kneipe["properties"]["opening_hours"]}

        if "operator" in kneipe["properties"]:
            dyn_dict["PutRequest"]["Item"]["operator"] = {"S" : kneipe["properties"]["operator"]}

        if "phone" in kneipe["properties"]:
            dyn_dict["PutRequest"]["Item"]["phone"] = {"S" : kneipe["properties"]["phone"]}

        if "website" in kneipe["properties"]:
            dyn_dict["PutRequest"]["Item"]["website"] = {"S" : kneipe["properties"]["website"]}

        dynamo_db_list["geo-data"].append(dyn_dict)

        if len(dynamo_db_list["geo-data"]) > 24:
            with open('dyname_temp.json', 'w') as outfile:
                json.dump(dynamo_db_list, outfile)

            os.system("aws dynamodb batch-write-item --request-items file://dyname_temp.json")

            dynamo_db_list = {"geo-data": []}
