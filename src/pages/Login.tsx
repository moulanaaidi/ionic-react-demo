// import './Signup.css';
import React from 'react';
import {
    IonPage,
    IonContent
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderContainer from '../components/HeaderContainer';

const Login: React.FC = () => {

    return (
        <IonPage>
            <HeaderContainer name='Login' />
            <IonContent fullscreen>
                <ExploreContainer />
            </IonContent>
        </IonPage>
    );
};

export default Login;