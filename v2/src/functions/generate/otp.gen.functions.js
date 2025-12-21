
export default function randomDigits(length) {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, num => num % 10).join('');
}