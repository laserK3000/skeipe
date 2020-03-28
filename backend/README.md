# AWS Backend

## API Routen
MUSS über https angesprochen werden

### GET https://api.skei.pe/v1/get_bars_in_vicinity?lat=&lt;LAT>&long=&lt;LONG>&distance=&lt;DISTANCE>

Parameter:

&lt;LAT>: latitude in degree 

&lt;LONG>: longitude in degree 

&lt;DISTANCE>: in degree

Rückgabe:
[{"opening_hours": "Su-Th 16:00-01:00, Fr-Sa 16:00-02:00", "operator": "Martin Eifler", "id": "node/3126151621", "lat": 52.3898105, "name": "Stadtteilkneipe Nowawes", "long": 13.0903197}]

id, lat, long und name sind immer vorhanden.
opening_hours nur bei manchen.

### PATCH https://api.skei.pe/v1/set_visitors

{
    "visitors": {
      "foo": "bar"
    },
    "id": "node/1116962400"
}

id muss mit der id von der Bar übereinstimmen. Inhalt von visitor dictionairy kann nach belieben gewählt werden. Handelt sich nur um strings.


## Lambda Funktionen

Sind entsprechend Routenname hier hinterlegt.