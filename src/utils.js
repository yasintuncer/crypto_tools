
/** ----------
 * @function guid_generator
 * @returns {string}
 * ----------
 * @description generate a guid
 * -----------------------------
 */
function guid_generator() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/** ------------------
 * @function aes_key_generator
 * @param {number} keySize // 128, 192, 256
 * @returns {string} //base64 encoded string
 * ------------------
 */
function aes_key_generator(keySize) {
    const key = crypto.lib.WordArray.random(keySize / 8);
    return key.toString(crypto.enc.Base64);
}


exports.guid_generator = guid_generator;
exports.aes_key_generator = aes_key_generator;
