import { localStorageManager } from "./localStorageManager.js";

// deviceUtils.js
const DEVICE_KEY = "_dID_";

/* ----------------------------------
 | Generate stable fingerprint seed
 ---------------------------------- */
function getFingerprintSeed() {
  return [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.colorDepth,
  ].join("|");
}

/* ----------------------------------
 | Simple hash (safe for frontend)
 ---------------------------------- */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit int
  }
  return `d_${Math.abs(hash)}`;
}

/* ----------------------------------
 | Get or create device ID
 ---------------------------------- */
export function getDeviceId() {
  let deviceId = localStorageManager.getItem(DEVICE_KEY);

  if (deviceId) return deviceId;

  const seed = getFingerprintSeed();
  deviceId = hashString(seed);

  localStorageManager.setItem(DEVICE_KEY, deviceId);
  return deviceId;
}

/* ----------------------------------
 | Device info (non-sensitive)
 ---------------------------------- */
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    colorDepth: screen.colorDepth,
  };
}
