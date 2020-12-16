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
import { _arrayBufferToBase64, _base64ToArrayBuffer } from '../services/util'
import {
    generateKeypair,
    exportPublicKey,
    importPublicKey,
    generateSecretKey,
    secretKeyToBase64String
} from '../services/crypto'
import { sendPostRequest } from '../services/http'

import './Signup.css';

const Signup: React.FC = () => {

    const signupHandler = async () => {
        const appKeypair = await generateKeypair();
        const appPubkeyAb = await exportPublicKey(appKeypair.publicKey)
        const appPublicKey: string = _arrayBufferToBase64(appPubkeyAb);

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

        const response = await sendPostRequest('/IMS_Authenticator_MAP/api/mobile/app/test', requestData);
        const responseJson: RegisterAppResponse = JSON.parse(response.data);
        console.log('RegisterAppResponse : ', responseJson);

        const serverPubKey = responseJson.serverPubKey;
        const serverPubkey: CryptoKey = await importPublicKey(serverPubKey);

        let appCekKey = await generateSecretKey(serverPubkey, appKeypair.privateKey)

        let appCekb64 = await secretKeyToBase64String(appCekKey)
        console.log('appCekb64 : ', appCekb64)
        
        await Storage.set({ key: KEYS.APP_CEK_KEY, value: appCekb64 });
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