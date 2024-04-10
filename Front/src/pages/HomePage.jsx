import React, { useState } from 'react'
import { IonIcon, IonNavLink, IonPage } from '@ionic/react';
import { IonContent, IonGrid, IonRow, IonCol, IonImg, IonToolbar,IonHeader, IonTitle, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader} from '@ionic/react';

const HomePage = () => {
  

  return (
    <IonPage>
      <IonHeader>
                <IonToolbar>
                  <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>   
      <IonContent>
          <IonCard color="light" routerLink='/foods' >
            <IonCardHeader>
              <IonCardTitle>Listado de comidas</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Toda la información que necesitas saber de tus alimentos.</IonCardContent>
          </IonCard>
      <IonCard color="light" routerLink='/upload'>
        <IonCardHeader>
          <IonCardTitle>Analizar Comida</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>Solo con subir una foto, tendrás toda la información necesaria.</IonCardContent>
      </IonCard>
      <IonCard color="light">
        <IonCardHeader>
          <IonCardTitle>Historial de búsquedas</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>Histórico de las fotos que has subido junto con sus datos</IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default HomePage