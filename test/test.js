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

    const files = fs.readdirSync(test_file_dir)

    for (i = 0; i < files.length; i++) {
        const data = fs.readFileSync(test_file_dir + "/" + files[i]);
        if (encrypt_test(aesCBC, data)) {
            const enc_buffer = aesCBC.encrypt(data);
            const enc_output_name = "enc" + "with_js" + ".bin";

            fs.writeFileSync(enc_output_name, enc_buffer);

            const dec_buffer = aesCBC.decrypt(enc_buffer);
            const dec_output_name = "dec" + "with_js" + ".png";

            fs.writeFileSync(dec_output_name, dec_buffer);
        }

    }
}



main();