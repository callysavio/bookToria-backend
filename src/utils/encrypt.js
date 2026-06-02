// utils/encrypt.js
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const algorithm = "aes-256-cbc";

// SHA-256 of the env key → raw 32-byte Buffer, which is what createCipheriv requires
const key = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY)
  .digest();

export const encryptData = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
};

export const decryptData = ({ encryptedData, iv }) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex"),
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
