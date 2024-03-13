const crypto = require('crypto');

class MessageDigestPasswordEncoder {
    constructor(algorithm, encodeHashAsBase64 = false) {
        this.algorithm = algorithm;
        this.encodeHashAsBase64 = encodeHashAsBase64;
        this.iterations = 1;
    }

    encodePassword(rawPass, salt) {
        const saltedPass = this.mergePasswordAndSalt(rawPass, salt, false);
        const messageDigest = this.getMessageDigest();

        let digest = messageDigest.update(saltedPass, 'utf-8').digest();

        for (let i = 1; i < this.iterations; i++) {
            digest = messageDigest.update(digest).digest();
        }

        if (this.encodeHashAsBase64) {
            return Buffer.from(digest).toString('base64');
        } else {
            return Buffer.from(digest).toString('hex');
        }
    }

    getMessageDigest() {
        try {
            return crypto.createHash(this.algorithm);
        } catch (error) {
            throw new Error(`No such algorithm [${this.algorithm}]`);
        }
    }

    mergePasswordAndSalt(rawPass, salt) {
        return salt ? rawPass + salt.toString() : rawPass;
    }

    isPasswordValid(encPass, rawPass, salt) {
        const pass1 = '' + encPass;
        const pass2 = this.encodePassword(rawPass, salt);

        return pass1 === pass2;
    }

    setIterations(iterations) {
        if (iterations > 0) {
            this.iterations = iterations;
        } else {
            throw new Error('Iterations value must be greater than zero');
        }
    }
}
module.exports = new MessageDigestPasswordEncoder('SHA1');
// Example usage
// const passwordEncoder = new MessageDigestPasswordEncoder('SHA1');
// const rawPassword = 'password';
// const salt = '';

// const encodedPassword = passwordEncoder.encodePassword(rawPassword, salt);
// console.log('Encoded Password:', encodedPassword);

// const isValid = passwordEncoder.isPasswordValid(encodedPassword, rawPassword, salt);
// console.log('Is Valid Password:', isValid);
