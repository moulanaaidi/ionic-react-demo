import { HTTP } from '@ionic-native/http';

export const sendPostRequest = (url: string, requestData: any) => {

    if (typeof requestData !== 'string') requestData = JSON.stringify(requestData)

    const options: any = {
        serializer: 'utf8',
        method: 'post',
        data: JSON.stringify(requestData)
    }

    return HTTP.sendRequest(process.env.REACT_APP_MAP_BASE_URL + url, options);
}