import sys
import os
import json
import base64
from crypto_tools import AESCipher, Modes

updir = os.path.dirname(os.path.dirname(__file__))
image_path = os.path.join(updir, 'assets/test.jpg')

key_path = 'keys.json'
with open(key_path,'r') as f:
    keys = json.load(f)
    f.close()

key = keys["256-bit"]
print(key)
file = open(image_path, 'rb')
image = file.read()


cipher = AESCipher(key.encode("utf-8"), Modes.CBC )

encrypted = cipher.encrypt(image)
with open('enc_with_py', 'wb') as f:
    f.write(encrypted)

decrypt = cipher.decrypt(encrypted)

if(cipher.checkEncryption(image,decrypt)):
    print("Encryption decryted succesfully")

with open('dec_with_py.jpg', 'wb') as f:
    f.write(decrypt)


