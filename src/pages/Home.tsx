import './Home.css';
import {
  IonContent,
  IonPage
} from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderContainer from '../components/HeaderContainer';

const Home: React.FC = () => {

  return (
    <IonPage>
      <HeaderContainer name='Home' />
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
