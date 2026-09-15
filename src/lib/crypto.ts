const PREFIX = 'sha256$'

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]

const H0 = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]

function rotr(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n))
}

export function sha256Hex(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let pLen = bytes.length + 1
  while (pLen % 64 !== 56) pLen++
  const msg = new Uint8Array(pLen + 8)
  msg.set(bytes, 0)
  msg[bytes.length] = 0x80
  let bitLen = bytes.length * 8
  for (let i = 0; i < 8; i++) {
    msg[pLen + 7 - i] = bitLen & 0xff
    bitLen = Math.floor(bitLen / 256)
  }

  const w = new Array<number>(64)
  let a = H0[0], b = H0[1], c = H0[2], d = H0[3]
  let e = H0[4], f = H0[5], g = H0[6], h = H0[7]

  for (let i = 0; i < msg.length; i += 64) {
    for (let t = 0; t < 16; t++) {
      w[t] = (msg[i + 4 * t] << 24) | (msg[i + 4 * t + 1] << 16) | (msg[i + 4 * t + 2] << 8) | msg[i + 4 * t + 3]
    }
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3)
      const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10)
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0
    }
    let A = a, B = b, C = c, D = d, E = e, F = f, G = g, H = h
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25)
      const ch = (E & F) ^ (~E & G)
      const temp1 = (H + S1 + ch + K[t] + w[t]) | 0
      const S0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)
      const maj = (A & B) ^ (A & C) ^ (B & C)
      const temp2 = (S0 + maj) | 0
      H = G
      G = F
      F = E
      E = (D + temp1) | 0
      D = C
      C = B
      B = A
      A = (temp1 + temp2) | 0
    }
    a = (a + A) | 0
    b = (b + B) | 0
    c = (c + C) | 0
    d = (d + D) | 0
    e = (e + E) | 0
    f = (f + F) | 0
    g = (g + G) | 0
    h = (h + H) | 0
  }

  return [a, b, c, d, e, f, g, h].map(x => (x >>> 0).toString(16).padStart(8, '0')).join('')
}

function generateSalt(): string {
  const arr = new Uint8Array(12)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(arr)
  } else {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256)
  }
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
}

export function isHashed(stored: string): boolean {
  return typeof stored === 'string' && stored.startsWith(PREFIX) && stored.includes(':')
}

export function hashPassword(password: string): string {
  const salt = generateSalt()
  return PREFIX + salt + ':' + sha256Hex(salt + password)
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!isHashed(stored)) return false
  const sep = stored.indexOf(':', PREFIX.length)
  const salt = stored.slice(PREFIX.length, sep)
  const expected = stored.slice(sep + 1)
  return safeEqual(sha256Hex(salt + password), expected)
}