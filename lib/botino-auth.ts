import { createHmac } from 'node:crypto';

function base64UrlEncode(input: Buffer | string): string {
  const buffer = typeof input === 'string' ? Buffer.from(input) : input;
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function computeUserHash(userId: string): string {
  const secret = process.env.BOTINO_IDENTITY_SECRET;
  if (!secret) {
    throw new Error('BOTINO_IDENTITY_SECRET is not set');
  }
  return createHmac('sha256', secret).update(userId).digest('hex');
}

export interface BotinoJwtClaims {
  user_id: string;
  name?: string;
  email?: string;
}

export function signBotinoToken(claims: BotinoJwtClaims): string {
  const secret = process.env.BOTINO_IDENTITY_SECRET;
  if (!secret) {
    throw new Error('BOTINO_IDENTITY_SECRET is not set');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    ...claims,
    userId: claims.user_id,
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = base64UrlEncode(
    createHmac('sha256', secret).update(signingInput).digest()
  );

  return `${signingInput}.${signature}`;
}
