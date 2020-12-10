export interface RegisterAppRequest {
    iss: string,
    jti: string,
    iat: number,
    appPubKey: string,
    appVersion: string,
    platform: string,
    deviceId: string,
    model: string,
    manufacturer: string,
    osVersion: string,
    serialNo: string,
    messageId: string,
    appInstanceId: string
}