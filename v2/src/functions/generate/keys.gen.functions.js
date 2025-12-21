//Generators
export default function generateApiKey(length = 20) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array, num => charset[num % charset.length]).join('');
}
