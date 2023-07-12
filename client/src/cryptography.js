const key = 3; // Shift key

export const encryptEmail = (email) => {
  let encryptedEmail = '';
  for (let i = 0; i < email.length; i++) {
    const char = email.charAt(i);
    const encryptedChar = String.fromCharCode(char.charCodeAt(0) + key);
    encryptedEmail += encryptedChar;
  }
  const encodedString = encodeURIComponent(encryptedEmail);
  return encodedString;
}

export const decryptEmail = (encryptedEmail) => {
  let decryptedEmail = '';
  for (let i = 0; i < encryptedEmail.length; i++) {
    const encryptedChar = encryptedEmail.charAt(i);
    const decryptedChar = String.fromCharCode(encryptedChar.charCodeAt(0) - key);
    decryptedEmail += decryptedChar;
  }
  return decryptedEmail;
}

