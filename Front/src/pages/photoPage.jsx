import { IonContent, IonPage, IonHeader,IonToolbar, IonButtons, IonBackButton,IonTitle,IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg,IonButton } from '@ionic/react'
import React from 'react'
import { camera } from 'ionicons/icons';

import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useState } from 'react';

import Input from '../components/Input';

const photoPage = () => {

    const [photos, setPhotos] = useState([])
    const [name, setName] = useState('')

    const handlNameChange = (e)=>{
        setName(e.target.value)
    }
  const handleCameraClick = async()=>{
    const {takePhoto} = await usePhotoGallery()
    const photo =await takePhoto()
    const fileName = Date.now() + '.jpeg';
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: photo.webPath,
      },
    ];
    console.log(newPhotos)
    setPhotos(newPhotos);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Take Picture</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
          <IonRow class="ion-justify-content-center">
            {photos.map((photo, index) => (
              <IonCol key={photo.filepath}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
          {
            photos.length?
            <>
                <IonRow class="ion-justify-content-center">
                    <IonCol>
                        <Input label='Nombre de la comida' name='name' type='text' value={name} handleChange={handlNameChange}placeholder={'e.g: macarrones con tomate'}/>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                    <IonCol size='6'>
                        <IonButton color='light' shape='round' fill='solid' expand='full'>Calcular</IonButton>
                    </IonCol>
                </IonRow>
            </>
            :
            <></>
          }
        </IonGrid>
        <IonFab vertical={!photos.length?"center":"bottom"} horizontal="center" slot="fixed">
            <IonFabButton>
                <IonIcon icon={camera} onClick={handleCameraClick}></IonIcon>
            </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default photoPage