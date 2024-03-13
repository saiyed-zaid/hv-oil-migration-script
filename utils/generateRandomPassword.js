function generateRandomPassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*';

    let password = '';

    // Generate at least one character from each required character type
    password += getRandomCharacter(lowercaseChars);
    password += getRandomCharacter(uppercaseChars);
    password += getRandomCharacter(numberChars);
    password += getRandomCharacter(specialChars);

    // Generate the remaining characters randomly
    const remainingLength = 10 - password.length;
    for (let i = 0; i < remainingLength; i++) {
        const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
        password += getRandomCharacter(allChars);
    }
    return password;
}

function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}
module.exports = generateRandomPassword;