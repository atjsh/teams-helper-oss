import * as crypto from 'node:crypto';

export function getRandomBase64String(length: number): string {
  return crypto.randomBytes(length).toString('base64');
}
