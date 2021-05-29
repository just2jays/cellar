from PIL import Image, ImageDraw, ImageSequence, ImageFont
import urllib2 as urllib
import requests
import io
import json
import sys
import random

def gen_hex_colour_code():
    return ''.join([random.choice('0123456789ABCDEF') for x in range(6)])

def gen_random_x_coord(width, font_min_width):
    return random.randint(0,(width - font_min_width))

def gen_random_y_coord(height, font_min_height):
    return random.randint(0,(height - font_min_height))

## VIA COMMAND LINE ENTRY
#query_subject = raw_input("What should be callin' it? ")
query_subject = sys.argv[1].replace(" ", "+")
font_choice = sys.argv[2]
rainbow_option = sys.argv[3]
crazy_option = sys.argv[4]
no_need_option = sys.argv[5]

# Size of text (in px) to avoid placement outside image bounds
if font_choice == "impact":
    font_size = 45
    font_min_width = 180
    font_min_height = 38
elif font_choice == "pacifico":
    font_size = 36
    font_min_width = 228
    font_min_height = 32
elif font_choice == "caviar_dreams":
    font_size = 45
    font_min_width = 202
    font_min_height = 40
elif font_choice == "seaside_resort":
    font_size = 36
    font_min_width = 266
    font_min_height = 68
else:
    font_size = 45
    font_min_width = 180
    font_min_height = 38

#===============================================
# NOTE: API ENDPOINTS ARE UNIQUE PER PROVIDER
#===============================================
# Shutterstock endpoint response
# api_response = requests.get('https://api.shutterstock.com/v2/images/search', params={'query':query_subject, 'sort':'random'} ,auth=('b7edf-ea46c-f9e1f-c3c53-168aa-55ad9', '211dc-b4742-ff457-8be17-34192-b1b97'))

# Giphy "Random" endpoint response
api_response = requests.get('https://api.giphy.com/v1/gifs/random', params={'api_key': '1UEBuY2QLIPPwGnpvOAKfAHlslQYsaZl','tag':query_subject})

# Giphy "Search" endpoint response
# api_response = requests.get('https://api.giphy.com/v1/gifs/search', params={'api_key': '1UEBuY2QLIPPwGnpvOAKfAHlslQYsaZl','q':query_subject})

jsonresponse = api_response.json()
json_list = json.dumps(jsonresponse)
parsed_json = json.loads(json_list)

#===============================================
# NOTE: IMAGE LOCATIONS ARE UNIQUE PER PROVIDER
#===============================================
# Shutterstock image location
#image_location = parsed_json['data'][0]['assets']['preview']['url']

# Giphy "Random" image location
image_location = parsed_json['data']['images']['downsized_large']['url']

# Giphy "Search" image location
#image_location = json_list2['data'][0]['images']['downsized_large']['url']

fd = urllib.urlopen(image_location)
image_file = io.BytesIO(fd.read())

im = Image.open(image_file)
font = ImageFont.truetype('fonts/'+font_choice+'.ttf', font_size)
width, height = im.size
randomwidth = gen_random_x_coord(width,font_min_width)
randomheight = gen_random_y_coord(height,font_min_height)
font_hex_color = '#FFFFFF'
image_text = 'CALLIN\' IT!'
if no_need_option == "true":
    image_text = 'NO NEED!'

# A list of the frames to be outputted
frames = []
# Loop over each frame in the animated image
for frame in ImageSequence.Iterator(im):
    if rainbow_option == "true":
        font_hex_color = '#'+gen_hex_colour_code()

    if crazy_option == "true":
        randomwidth = gen_random_x_coord(width,font_min_width)
        randomheight = gen_random_y_coord(height,font_min_height)

    frame = frame.convert('RGBA')
    # Draw the text on the frame
    d = ImageDraw.Draw(frame)
    d.text((randomwidth,randomheight), image_text, font=font, fill=font_hex_color)
    del d

    # However, 'frame' is still the animated image with many frames
    # It has simply been seeked to a later frame
    # For our list of frames, we only want the current frame

    # Saving the image without 'save_all' will turn it into a single frame image, and we can then re-open it
    # To be efficient, we will save it to a stream, rather than to file
    b = io.BytesIO()
    frame.save(b, format="GIF")
    frame = Image.open(b)

    # Then append the single frame image to a list of frames
    frames.append(frame)
# Save the frames as a new image
frames[0].save('./gifs/out.gif', save_all=True, append_images=frames[1:])
print "{\"query\":\""+query_subject+"\", \"message\":\"Done!\"}"