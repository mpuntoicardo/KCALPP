import {IonAlert, IonContent, IonPage, IonHeader,IonToolbar, IonButtons, IonBackButton,IonTitle,IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg,IonButton, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonList, IonText, IonItem } from '@ionic/react'
import React, { useEffect } from 'react'
import { camera } from 'ionicons/icons';

import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useState } from 'react';
import Cookie from 'js-cookie'

import Input from '../components/Input';

import BarLoader from "react-spinners/BarLoader";

import './historyDetails.css'

const photoPage = () => {

    const [cookie, setCookie] = useState('')

    useEffect(()=>{
      setCookie(Cookie.get('token'))
    },[])

    const [photos, setPhotos] = useState([])
    const [name, setName] = useState('')

    const [loading, setLoading] = useState(false)
    const [food, setFood] = useState(null)

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
        setLoading(true)
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
          console.log(data)
          const set = new Set([...data.data.ids])
          let newData = data.data.nutritional_info_per_item.filter((el)=>{
            if(set.has(el.id)){
              set.delete(el.id)
              return true
            }else{
              return false
            }
          })
          let totalKcals = 0
          newData = newData.map((el)=>{
            totalKcals += el.nutritional_info.calories
            el['name'] = data.data.foodName[el.food_item_position-1]
            return el
          })
          setFood({food: newData, totalKcals})
        } else {
          console.log('Failed to upload image.', data);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      setLoading(false)
    }
  }

  useEffect(()=>{
    console.log(food)
  },[food])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
          {
            loading?
            <BarLoader color='#ffffff' width={50}/>
            :
            <></>
          }
          {
            food?
            <IonRow>
              <IonCol>
                <IonTitle>Calorías totales: {food.totalKcals}</IonTitle>
              </IonCol>
            </IonRow>
              :<></>
          }
          </IonGrid>
          {
            food?.food.map((el)=>{
              return <IonCard color='light'>
                <IonCardHeader>
                  <IonCardTitle>{capitalizeFirstLetter(el.name)}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonCardSubtitle>Cantidad: {el.serving_size}g</IonCardSubtitle>
                  <IonCardSubtitle>Calorías: {el.nutritional_info.calories}kcal</IonCardSubtitle>
                  <IonList className="custom-ion-list" color="light"> 
                    <IonItem className="custom-ion-item" color="light">
                      <IonText>Proteína: {el.nutritional_info.totalNutrients.PROCNT.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.PROCNT.unit}</IonText>
                    </IonItem>
                    <IonItem className="custom-ion-item" color="light">
                      <IonText>Carbohidratos: {el.nutritional_info.totalNutrients.CHOCDF.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.CHOCDF.unit}</IonText>
                    </IonItem>
                    <IonItem className="custom-ion-item" color="light">
                      <IonText>Azúcares: {el.nutritional_info.totalNutrients.SUGAR.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.SUGAR.unit}</IonText>
                    </IonItem>
                    <IonItem className="custom-ion-item" color="light">
                      <IonText>Grasas: {el.nutritional_info.totalNutrients.FAT.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.FAT.unit}</IonText>
                    </IonItem>
                    <IonItem className="custom-ion-item" color="light">
                      <IonText>Grasas saturadas: {el.nutritional_info.totalNutrients.FASAT.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.FASAT.unit}</IonText>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            })
          }
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