import crypto from 'crypto';

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'njtech_admin_secret_key_2026';

/**
 * Signs a payload using HMAC-SHA256.
 * @param {object} payload 
 * @returns {string} Signed token
 */
export function signToken(payload) {
  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString('base64');
  
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(base64Payload);
  const signature = hmac.digest('hex');
  
  return `${base64Payload}.${signature}`;
}

/**
 * Verifies a token's signature and expiration.
 * @param {string} token 
 * @returns {object|null} Decoded payload or null if invalid
 */
export function verifyToken(token) {
  if (!token) return null;
  
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  
  const [base64Payload, signature] = parts;
  
  // Re-verify signature
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(base64Payload);
  const expectedSignature = hmac.digest('hex');
  
  if (signature !== expectedSignature) {
    return null; // Invalid signature
  }
  
  try {
    const payloadStr = Buffer.from(base64Payload, 'base64').toString('utf8');
    const payload = JSON.parse(payloadStr);
    
    // Check expiration
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return null; // Expired
    }
    
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Verifies the admin request session from cookies.
 * @param {Request} request 
 * @returns {boolean} True if authenticated
 */
export function verifyRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);
  const sessionToken = cookies['admin_session'];
  
  if (!sessionToken) return false;
  
  const decoded = verifyToken(sessionToken);
  return decoded !== null && decoded.authenticated === true;
}

/**
 * Helper to parse cookies.
 * @param {string} cookieHeader 
 * @returns {object} Cookies object
 */
function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts.shift().trim();
    const value = parts.join('=').trim();
    if (name) {
      list[name] = decodeURIComponent(value);
    }
  });
  
  return list;
}
