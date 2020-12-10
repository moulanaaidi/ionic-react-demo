export interface RegisterAppResponse {
    iss: string,
    jti: string,
    iat: number,
    code: string,
    description: string,
    applicationId: string,
    serverPubKey: string
}