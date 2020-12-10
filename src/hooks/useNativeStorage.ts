import { useEffect, useState } from "react"
// import { Storage } from '@capacitor/core'

const useNativeStorage = (key: string) => {

    // const [value, setValue] = useState('');

    // useEffect(() => {
    //     // Storage.get({ key: key }).then(res => {
    //     //     setValue(res.value)
    //     // });
    //     setValue('')
    // }, [key])

    function get(param: string) {

        return param;
    }

    return [get]
}

export default useNativeStorage