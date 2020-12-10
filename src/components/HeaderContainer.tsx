import React from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle
} from '@ionic/react';

interface HeaderProps {
    name: string
}

const HeaderContainer: React.FC<HeaderProps> = ({ name }) => {

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
        </IonHeader >
    );
};

export default HeaderContainer;
