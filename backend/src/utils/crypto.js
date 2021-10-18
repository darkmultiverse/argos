const aes = require('aes-js');

const key = aes.utils.utf8.toBytes(process.env.AES_KEY);
if(key.length !== 32) throw new Error('Chave inválida para o AES. A chave deve conter 32 Bytes.')

function encrypt(text) {
    const bytesInfo = aes.utils.utf8.toBytes(text);
    const aesCtr = new aes.ModeOfOperation.ctr(key);
    const encryptedBytes = aesCtr.encrypt(bytesInfo);
    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

function decrypt(encryptedHex) {
    const encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
    const aesCtr = new aes.ModeOfOperation.ctr(key);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return aes.utils.utf8.fromBytes(decryptedBytes);
}

module.exports = {
    encrypt,
    decrypt
}