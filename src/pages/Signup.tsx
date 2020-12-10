import React from 'react';
import { Storage } from '@capacitor/core';
import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderContainer from '../components/HeaderContainer';
import { RegisterAppRequest } from '../models/RegisterAppRequest'
import { RegisterAppResponse } from '../models/RegisterAppResponse'
import { KEYS } from '../constants';
import './Signup.css';

const _arrayBufferToBase64 = (ab: ArrayBuffer) => {
    let binary = '';
    let bytes = new Uint8Array(ab);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

const _base64ToArrayBuffer = (base64str: string) => {
    let binary_string = window.atob(base64str);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

const Signup: React.FC = () => {

    const signupHandler = async () => {
        const appKeypair = await window.crypto.subtle.generateKey(
            {
                name: "ECDH",
                namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            ["deriveKey", "deriveBits"] //can be any combination of "deriveKey" and "deriveBits"
        )

        const appPubkeyAb = await window.crypto.subtle.exportKey(
            "raw",
            appKeypair.publicKey
        );

        let appPublicKey: string = _arrayBufferToBase64(appPubkeyAb);

        const requestData: RegisterAppRequest = {
            "iss": "IMS_AUTHENTICATOR",
            "jti": "340b1c6bf30547e08d614a51baf8a3ab",
            "iat": (new Date()).getTime(),
            "appPubKey": appPublicKey,
            "appVersion": "1.0",
            "platform": "1",
            "deviceId": "f7691f267e202d5b",
            "model": "Nexus 6P",
            "manufacturer": "Huawei",
            "osVersion": "8.1.0",
            "serialNo": "CVH5T15C18000250",
            "messageId": "cmfh_QRIxCQ:APA91bG5z39bE0TpRHpwvhzY0IcNUEO7Tj5qGUwKn6IlzVso0w1NXI7WoiH4cjJ3-EglD4Q9vWQpsIwr8pPtW5JnJqUhdWtE7GwNhXCdpa9REzx0GiWCpQh92ZOneZ7KWozWINMYbf4L",
            "appInstanceId": "cmfh_QRIxCQ"
        };


        let responseData: Response = await fetch(process.env.REACT_APP_SERVER_URL + '', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/text'
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(requestData) // body dasta type must match "Content-Type" header
        })

        let responseJson: RegisterAppResponse = (await responseData.json()).message;
        console.log('RegisterAppResponse : ', responseJson);
        let serverPubKey = responseJson.serverPubKey;
        let serverPubkeyAb = _base64ToArrayBuffer(serverPubKey)

        let serverPubkey: CryptoKey = await window.crypto.subtle.importKey(
            "spki", //can be "jwk" (public or private), "raw" (public only), "spki" (public only), or "pkcs8" (private only)
            serverPubkeyAb,
            {   //these are the algorithm options
                name: "ECDH",
                namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            [] //"deriveKey" and/or "deriveBits" for private keys only (just put an empty list if importing a public key)
        );

        let appCekKey = await window.crypto.subtle.deriveKey(
            {
                name: "ECDH",
                public: serverPubkey
            },
            appKeypair.privateKey,
            {
                name: "AES-GCM",
                length: 256
            },
            false,
            ["encrypt", "decrypt"]
        );

        const appSecretKeyAb = await window.crypto.subtle.exportKey(
            "raw",
            appCekKey
        );

        await Storage.set({ key: KEYS.APP_CEK_KEY, value: _arrayBufferToBase64(appSecretKeyAb) });
    }

    return (
        <IonPage>
            <HeaderContainer name='Signup' />
            <IonContent fullscreen>
                <ExploreContainer />
                <IonButton onClick={() => signupHandler()}>Signup</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Signup;