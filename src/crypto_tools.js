const crypto = require('crypto')
/**------------------
 * @enum Mode
 * ------------------
 * @description AES encryption modes
 *  AES can be use multiple approach, so you can use all supported mode in this list
 * --------------------------
 */
const Mode = {
    'CBC': 'aes-256-cbc',
    'CFB': 'aes-256-cfb',
    'CTR': 'aes-256-ctr',
    'ECB': 'aes-256-ecb',
    'OFB': 'aes-256-ofb'
}
/**------------------
 * @class AESCipher
 * @param {string} key
 * @param {Mode} mode
 * ------------------
 * @description AES encryption class
 * ------------------------------
 */
class AESCipher {

    /**------------ 
     * @constructor
     * @param {string} key
     * @param {Mode} mode
     * ------------
    */
    constructor(key, mode) {
        const supportedModes = [Mode.CBC, Mode.CFB, Mode.CTR, Mode.ECB, Mode.OFB];
        if (!supportedModes.includes(mode)) {
            throw new Error("Mode not supported");
        }
        this.key = key
        this.mode = mode;
    }


    /**------------------
     * @function encrypt
     * @param {Buffer} data
     * @returns {Buffer} // encrypted data
     * ------------------
     * @description encrypt data
     * --------------------------
     */
    encrypt(data) {
        // iV is generated for each encryption for key security.
        // iv vector is added beginning of encrypted data. 
        // It's not used for data, used for key
        const initVector = crypto.randomBytes(16);

        // buffer converting base64 string
        const base64_data = data.toString("base64");
        //Note: block-based cipher algorithms use padding. 
        //      Padding fills this raw data to the block size, 
        // making it workable by the encryption algorithm.
        //      Padding size information is added end of the data. 
        //      When the decrypt the data, the padding section should be removed 
        // as much as the padding size by looking end of the data 
        // creating cipher. in this crypto library autoamtically handle padding.
        const cipher = crypto.createCipheriv(this.mode, this.key, initVector);

        // encrypt
        let encryptedData = cipher.update(base64_data, "base64", "base64");
        encryptedData += cipher.final("base64");
        // encrypted base64 string data to buffer
        const Combine_Buffer = Buffer.concat([initVector, Buffer.from(encryptedData, "base64")]);
        return Combine_Buffer;
    }

    /**------------------
     * @function decrypt
     * @param {Buffer} data
     * @returns {Buffer} // decrypted data
     * ------------------
     */
    decrypt(data) {

        // Iv vector is read in encrypted data
        const initVector = data.slice(0, 16);
        //Note: block-based cipher algorithms use padding. 
        //      Padding fills this raw data to the block size, 
        // making it workable by the encryption algorithm.
        //      Padding size information is added end of the data. 
        //      When the decrypt the data, the padding section should be removed 
        // as much as the padding size by looking end of the data 
        // creating decipher. in this crypto library autoamtically handle padding.
        const decipher = crypto.createDecipheriv(this.mode, this.key, initVector);
        // decrypt
        let decryptedData = decipher.update(data.slice(16), "base64", "base64");
        decryptedData += decipher.final("base64");
        
        // decrypted base64 string data to buffer
        const decrypted_Buffer = Buffer.from(decryptedData, "base64");
        return decrypted_Buffer;
    };

    /**------------------
     * @function checkEncryption
     * @param {Buffer} encrypted
     * @param {Buffer} data
     * @returns {boolean}
     * ------------------
     * @description check if the encrypted data is the same as the original data
     * it takes decrypted buffer and original buffer and compare.
     * --------------------------
     */
    checkEncryption(decrypted, data) {
        if (data.equals(decrypted)) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = {
    AESCipher,
    Mode
}