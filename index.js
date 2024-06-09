// Create the lookup tables for Base64 characters
const base64Chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64CharToValue = {};
const valueToBase64Char = [];

// Populate the lookup tables
for (let i = 0; i < base64Chars.length; i++) {
  const char = base64Chars[i];
  base64CharToValue[char] = i;
  valueToBase64Char[i] = char;
}

// Encoding function
function encodeVLQ(number) {
  let encoded = "";
  let digit;

  do {
    digit = number % 32; // Get the lowest 5 bits (5-bit value)
    number = Math.floor(number / 32); // Divide the number by 32
    if (number > 0) {
      digit += 32; // Set the continuation bit if there are more digits
    }
    encoded += valueToBase64Char[digit]; // Convert to VLQ character
  } while (number > 0);

  return encoded;
}

// Decoding function
function decodeVLQ(vlqString) {
  let result = 0;
  let shift = 0;

  for (let i = 0; i < vlqString.length; i++) {
    let char = vlqString[i];
    let value = base64CharToValue[char]; // Get the 5-bit value from the character

    result += (value & 31) << shift; // Add the value shifted by the current position

    if (value & 32) {
      // Check if continuation bit is set
      shift += 5; // Move to the next 5 bits
    } else {
      break; // No more continuation bits, final number
    }
  }

  return result;
}
