import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact, 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, homeOutline, pizzaOutline } from 'ionicons/icons';

import Landing from './pages/Landing.jsx'
import Login from './pages/loginPage.jsx'

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
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/signupPage.jsx'
import foodPage from './pages/foodPage.jsx';

import Tabs from './components/Tabs.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
          <Route exact path="/" component={Landing}/>
          <Route exact path = "/login" component={Login}/>
          <Route exact path = "/signup" component={Signup}/>
          <PrivateRoute path="/home" component={Tabs}/>
          <PrivateRoute path="/foods" component={Tabs}/>
          <PrivateRoute path="/upload" component={Tabs}/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
