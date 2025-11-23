export default function parseToken(token) {
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];       // беремо другу частину
    const payloadJson = atob(payloadBase64);        // декодуємо Base64
    const payload = JSON.parse(payloadJson);       // перетворюємо у об’єкт
    return payload;
  } catch (err) {
    console.error("Помилка при розборі токена:", err);
    return null;
  }
}
