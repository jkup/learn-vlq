# learn-vlq

An educational resource for learning how VLQ encoding works.

## Example usage

```javascript
let numberToEncode = 123;
let encodedVLQ = encodeVLQ(numberToEncode);
console.log(`Encoded: ${encodedVLQ}`); // Output: Encoded: b

let vlqStringToDecode = encodedVLQ;
let decodedNumber = decodeVLQ(vlqStringToDecode);
console.log(`Decoded: ${decodedNumber}`); // Output: Decoded: 123
```
