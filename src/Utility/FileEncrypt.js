import JSZip from 'jszip';
import { AES } from 'crypto-js';

async function createZipWithPassword(files, password) {
  const zip = new JSZip();

  // Add each file to the zip archive
  for (const file of files) {
    const fileData = await getFileAsArrayBuffer(file);
    zip.file(file.name, fileData);
  }

  // Generate the zip archive with a password
  const zipOptions = { compression: 'DEFLATE', encryption: 'AES-256' };
  const zipBlob = await zip.generateAsync(zipOptions);

  // Encrypt the zip archive with the password
  const encryptedZip = AES.encrypt(zipBlob, password).toString();

  return encryptedZip;
}

async function getFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

export { createZipWithPassword };