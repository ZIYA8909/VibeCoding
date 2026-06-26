async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error(
      "SubtleCrypto is not available. Please ensure you are serving this site in a Secure Context (e.g., http://localhost:5173 or HTTPS) or check browser settings."
    );
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch encrypted asset "${url}": HTTP ${response.status} ${response.statusText}`);
  }
  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
