import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { cameraOutline, homeOutline, newspaperOutline, pizzaOutline } from 'ionicons/icons'; // Use appropriate icons
import { Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx'; // Adjust path as necessary
import foodPage from '../pages/foodPage.jsx'; // Adjust path as necessary
import photoPage from '../pages/photoPage.jsx';

const Tabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/home" component={HomePage}/>
      <Route exact path="/foods" component={foodPage} />
      <Route exact path="/upload" component={photoPage}/>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="upload" href="/upload">
        <IonIcon icon={cameraOutline} />
        <IonLabel>Upload picture</IonLabel>
      </IonTabButton>
      <IonTabButton tab="foods" href="/foods">
        <IonIcon icon={pizzaOutline} />
        <IonLabel>Foods</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
