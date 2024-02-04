from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from enum import Enum
import os
class Modes(Enum):
    ECB = 1        #: Electronic Code Book (:ref:`ecb_mode`)
    CBC = 2        #: Cipher-Block Chaining (:ref:`cbc_mode`)
    CFB = 3        #: Cipher Feedback (:ref:`cfb_mode`)    
    OFB = 5        #: Output Feedback (:ref:`ofb_mode`)
    CTR = 6        #: Counter mode (:ref:`ctr_mode`)
    OPENPGP = 7    #: OpenPGP mode (:ref:`openpgp_mode`)
    CCM = 8        #: Counter with CBC-MAC (:ref:`ccm_mode`)
    EAX = 9        #: :ref:`eax_mode`
    SIV = 10       #: Galois Counter Mode (:ref:`gcm_mode`)
    GCM = 11       #: Synthetic Initialization Vector (:ref:`siv_mode`)
    OCB = 12       #: Offset Code Book (:ref:`ocb_mode`)


class AESCipher:

    """
    @constructor
    @param key : 256 bit string key 
    @param mode: Aes algorithm modes   
    """ 
    def __init__(self, key, mode):
        self.key = key
        self.mode = mode.value
        self.block_size = 16
        
    """
    @param data: bytes
    @description: encrypt data
    @return: bytes
    """
    def encrypt(self, data):
        iv = os.urandom(self.block_size)
        cipher = AES.new(self.key, self.mode,iv)
        padded_data = pad(data, self.block_size)
        cipher_text = cipher.encrypt(padded_data)

        # merge bytes 
        iv_and_cipher_text = iv + cipher_text
                
        return iv_and_cipher_text


    """
    @param data: bytes
    @description: decrypt data
    @return: bytes
    """
    def decrypt(self, data):
        
        iv = data[:self.block_size];
        
         # get cipher text
        encypted_text = data[self.block_size:]
        
        # create cipher object
        cipher = AES.new(self.key, self.mode, iv)
        
        # decrypt data
        padded_plain_text = cipher.decrypt(encypted_text)
        
        # unpad data
        plain_text = unpad(padded_plain_text, self.block_size)
        # return plain text
        return plain_text
    
    """
    @param origin_data: bytes
    @param decrypted_data: bytes
    return succes: boolean 
    """
    def checkEncryption(self, origin_data, decrypted_data):
        if len(origin_data) != len(decrypted_data):
            return False
        for i in range(len(decrypted_data)):
            if decrypted_data[i] != origin_data[i]:
                return False
        return True
