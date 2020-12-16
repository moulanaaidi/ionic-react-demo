
export const _arrayBufferToBase64 = (ab: ArrayBuffer) => {
    let binary = '';
    let bytes = new Uint8Array(ab);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export const _base64ToArrayBuffer = (base64str: string) => {
    let binary_string = window.atob(base64str);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}