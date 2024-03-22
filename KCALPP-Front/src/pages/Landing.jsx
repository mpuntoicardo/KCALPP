import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle } from '@ionic/react'
import React from 'react'
import Landing_SVG from '../components/Landing_SVG'

import './Landing_Module_css.css'

const Landing = () => {
  return (
    <IonPage >
      <IonContent class="ion-text-center ion-justify-content-center" scrollY="false">
        <div class='title-container'>
          <h1 className='title'><strong>KCALPP</strong></h1>
          <div>
            <div>
              <Landing_SVG class="landing-image"></Landing_SVG>
            </div>
            <p>La forma más fácil de llevar un seguimiento de toda tu información nutricional</p>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <div class='footer'>
          <IonGrid>
              <IonRow class="ion-justify-content-center">
                <IonCol size='6' class="ion-text-center">
                <IonButton color='light' shape='round' fill='solid' expand='full'>
                  <strong>Login</strong>
                </IonButton>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <IonCol size='6' class="ion-text-center">
                <IonButton color='light' shape='round' fill='outline' expand='full'>
                  <strong>Register</strong>
                </IonButton>
                </IonCol>
              </IonRow>
          </IonGrid>
        </div>
      </IonFooter>
      </IonPage>
  )
}

export default Landing
