import requests
import os

api_user_token = '6f2da6268d87b9a7f1a9cbe3814c7830647e3d70'
headers = {'Authorization': 'Bearer ' + api_user_token}

api_url = 'https://api.logmeal.es/v2'

def upload_logmeal(image):

    endpoint = '/image/segmentation/complete/v1.1?language=spa'
    response = requests.post(api_url + endpoint,
                        files={'image': open(image, 'rb')},
                        headers=headers)

    resp = response.json()
    print(resp["imageId"])
    return resp["imageId"]

def get_info(image_id):
    endpoint = '/nutrition/recipe/nutritionalInfo/v1.0?language=spa'
    response = requests.post(api_url + endpoint,
                        json={"imageId": image_id},
                        headers=headers)

    return response.json()
