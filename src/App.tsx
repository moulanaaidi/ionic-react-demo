import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { KEYS } from '../src/constants';
import { Storage } from '@capacitor/core'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const [isKeyExchanged, setIsKeyExchanged] = useState(false);

  useEffect(() => {
    Storage.get({ key: KEYS.APP_CEK_KEY }).then(res => {
      if (res.value) setIsKeyExchanged(true)
    });
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={isKeyExchanged ? Login : Signup} />
          {/* <Route exact path="/" render={() => <Redirect to="/signup" />} /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
