import crypto from "crypto";
const secret = "testtesttesttesttesttesttesttest";

const encrypt = (password) => {
    /*const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ccm', Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return {iv: iv.toString('hex'), password: encryptedPassword.toString('hex')};*/
    return crypto.AES.encrypt("password", secret).toString();
};

const decrypt = (encryption) => {
   /* const decipher = crypto.createDecipheriv('aes-256-ccm', Buffer.from(secret), Buffer.from(encryption.iv, 'hex'));
    const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryption.password, 'hex')), decipher.final()]);*/

    let bytes = crypto.AES.decrypt(encryption, secret);
    let originalText = bytes.toString(crypto.enc.Utf8);

    return originalText;
};

export default encrypt;
