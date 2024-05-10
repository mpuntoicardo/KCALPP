import os
from PIL import Image

def process(filename):
    path = os.path.join("tmp", filename)
    im = Image.open(path)
    rgb_image = im.convert('RGB')

    jpg = filename.split('.')[:2]
    jpg = '.'.join(jpg) + ".jpg"
    jpg = os.path.join("tmp", jpg)

    size_mb = os.path.getsize(path) >> 20
    width, height = rgb_image.size

    while(size_mb >= 1):

        size=int(width*0.75), int(height*0.75)
        rez_image = rgb_image.resize(size, Image.ANTIALIAS)

        rez_image.save(path)

        size_mb = os.path.getsize(path) >> 20

    rgb_image.save(jpg, quality=50)



