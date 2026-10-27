import fs from 'node:fs';

/**
 * Validates the initial bytes (magic numbers) of an uploaded file to ensure
 * it is an authentic image (JPEG, PNG, WebP, or GIF) and not an executable
 * or malicious script masquerading as an image.
 *
 * @param {string} filePath - Absolute path to the file on disk
 * @returns {Promise<boolean>} True if the file content matches an allowed image format
 */
export async function validateImageMagicBytes(filePath) {
  let fileHandle;
  try {
    fileHandle = await fs.promises.open(filePath, 'r');
    const buffer = Buffer.alloc(16);
    const { bytesRead } = await fileHandle.read(buffer, 0, 16, 0);
    if (bytesRead < 4) return false;

    // JPEG: FF D8 FF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return true;
    }

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (
      bytesRead >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    ) {
      return true;
    }

    // GIF: 'GIF8' (GIF87a or GIF89a)
    if (
      buffer[0] === 0x47 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x38
    ) {
      return true;
    }

    // WebP: RIFF (bytes 0..3) ... WEBP (bytes 8..11)
    if (
      bytesRead >= 12 &&
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  } finally {
    if (fileHandle) {
      await fileHandle.close().catch(() => {});
    }
  }
}
