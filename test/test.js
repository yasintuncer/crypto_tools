const crypto = require('crypto')
const fs = require('fs');

// AesCipher is a class that encrypts and decrypts data
const AESCipher = require('../src/crypto_tools.js').AESCipher;
// Mode is an enum that contains the supported encryption modes
const Mode = require('../src/crypto_tools.js').Mode;

// key hold files
const keys = require('./keys.json');

const test_file_dir = process.cwd() + "/assets";

function encrypt_test(aescipher /*: AesCipher*/, buffer) {
    const encrypted_buffer = aescipher.encrypt(buffer);
    const decrypted_buffer = aescipher.decrypt(encrypted_buffer);

    if (aescipher.checkEncryption(decrypted_buffer, buffer)) {
        console.log(" En-DeCryption Succes")
        return true;
    }
    else {
        console.log(" En-DeCryption Error")
        return false;
    }

}
function main() {

    console.log(keys)
    // create AESCipher instance
    const key = keys["256-bit"];
    const aesCBC = new AESCipher(key, Mode.CBC);

    const file = "../assets/test.jpg"

    // read file
    const data = fs.readFileSync(file);

    encrypted_data = aesCBC.encrypt(data);
    fs.writeFileSync("enc_with_js.bin", encrypted_data);

    decrypted_data = aesCBC.decrypt(encrypted_data);
    fs.writeFileSync("dec_with_js.jpg", decrypted_data);
    
}



main();