import {IonAlert, IonContent, IonPage, IonHeader,IonToolbar, IonButtons, IonBackButton,IonTitle,IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg,IonButton } from '@ionic/react'
import React, { useEffect } from 'react'
import { camera } from 'ionicons/icons';

import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useState } from 'react';
import Cookie from 'js-cookie'

import Input from '../components/Input';

const photoPage = () => {

    const [cookie, setCookie] = useState('')

    useEffect(()=>{
      setCookie(Cookie.get('token'))
    },[])

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

    const [showError, setShowError] = useState(false)

  async function handleSubmitClick(){
    if(name === ""){
      setShowError(true)
    }else{
        const response = await fetch(photos[0].webviewPath);
            const blob = await response.blob();
            
            const formData = new FormData();
            formData.append('image', blob);
            formData.append('name', name);
        try {
            const response = await fetch('http://localhost:5001/image', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Authorization": "Auth " + cookie
                },
                body: formData,
            });
  
        const data = await response.json();
        if (response.ok) {
          console.log('Image uploaded successfully.');
          return data;
        } else {
          console.log('Failed to upload image.', data);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }

    }
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
                        <Input label='Nombre de la comida' type='text' value={name} handleChange={handlNameChange}placeholder={'e.g: macarrones con tomate'}/>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                    <IonCol size='6'>
                        <IonButton color='light' shape='round' fill='solid' expand='full' onClick={handleSubmitClick}>Calcular</IonButton>
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
      <IonAlert
        isOpen={showError}
        header='Nombre vacío'
        message='El nombre no puede estar vacío'
        buttons={['Cerrar']}
        onDidDismiss={() => setShowError(false)}
        ></IonAlert>
    </IonPage>
  );
}

export default photoPage