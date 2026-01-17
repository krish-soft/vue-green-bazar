import CryptoJS from "crypto-js";

const SECRET_KEY = "9MZ7DK60U6FIQ3ZAKf8D92XGcNHOMObe";

/* ----------------------------
 | Encrypt
 ---------------------------- */
const encryptData = (data) => {
  try {
    const json = JSON.stringify(data);
    return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
  } catch (err) {
    console.error("Encryption error:", err);
    return null;
  }
};

/* ----------------------------
 | Decrypt
 ---------------------------- */
const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
};

/* ----------------------------
 | LocalStorage Manager
 ---------------------------- */
export const localStorageManager = {
  setItem(key, value) {
    const encrypted = encryptData(value);
    if (encrypted) {
      localStorage.setItem(key, encrypted);
    }
  },

  getItem(key) {
    const encrypted = localStorage.getItem(key);
    return encrypted ? decryptData(encrypted) : null;
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  clearAll() {
    localStorage.clear();
  },
};
