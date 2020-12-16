import { _arrayBufferToBase64, _base64ToArrayBuffer } from '../services/util'

export const generateKeypair = async () => {
    return await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["deriveKey", "deriveBits"] //can be any combination of "deriveKey" and "deriveBits"
    )
}

export const exportPublicKey = async (publicKey: CryptoKey) => {
    return await window.crypto.subtle.exportKey(
        "spki",
        publicKey
    )
}

export const importPublicKey = async (publicKey: string) => {
    const publicKeyInArrayBuffer = _base64ToArrayBuffer(publicKey)
    return await window.crypto.subtle.importKey(
        "spki", //can be "jwk" (public or private), "raw" (public only), "spki" (public only), or "pkcs8" (private only)
        publicKeyInArrayBuffer,
        {   //these are the algorithm options
            name: "ECDH",
            namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        [] //"deriveKey" and/or "deriveBits" for private keys only (just put an empty list if importing a public key)
    )
}

export const generateSecretKey = async (publicKey: CryptoKey, privateKey: CryptoKey) => {
    return await window.crypto.subtle.deriveKey(
        {
            name: "ECDH",
            public: publicKey
        },
        privateKey,
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    )
}

export const secretKeyToBase64String = async (secretKey: CryptoKey) => {
    const secretKeyInArrayBuffer = await window.crypto.subtle.exportKey(
        "raw",
        secretKey
    )

    return _arrayBufferToBase64(secretKeyInArrayBuffer);
}