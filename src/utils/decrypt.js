import crypto from "crypto";

const algorithm = "aes-256-cbc";

const key = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY)
  .digest("base64")
  .substring(0, 32);

export const decryptData = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex"),
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf8");

  decrypted += decipher.final("utf8");

  return decrypted;
};
