import { IonCardContent, IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonButtons, IonBackButton, IonImg, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonCard, IonText, IonGrid, IonCol, IonRow, IonLabel } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

import './historyDetails.css'

const historyDetails = () => {

    const location = useLocation();
    const detailData =  location.state ? location.state.detailData : null;
    const [data, setData] = useState(null)
    useEffect(()=>{
        console.log(detailData)
        const parsedData = JSON.parse(detailData.data);
        const set = new Set([...parsedData.ids])
          let newData = parsedData.nutritional_info_per_item.filter((el)=>{
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
            el['name'] = parsedData.foodName[el.food_item_position-1]
            return el
          })
          console.log(newData, totalKcals)
          setData({food: newData, totalKcals})
    },[])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

  return (
    <IonPage>
        <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>{detailData?.name}</IonTitle>
            </IonToolbar>
        </IonHeader> 
        <IonContent>
        <IonGrid>
            <IonRow class="ion-justify-content-center">
                <IonCol size='12'>
                    <IonImg src={detailData?.url}></IonImg>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonText><strong>Calorías totales: {data?.totalKcals}kcal</strong></IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonText><strong>Comidas Identificadas:</strong></IonText>
                </IonCol>
            </IonRow>
        </IonGrid>
            {
            data?.food.map((el,i)=>{
             return <IonCard color="light" key={i}>
                <IonCardHeader>
                    <IonCardTitle>{capitalizeFirstLetter(el.name)}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                <IonCardSubtitle>Cantidad: {el.serving_size}g</IonCardSubtitle>
                  <IonCardSubtitle>Calorías: {el.nutritional_info.calories}kcal</IonCardSubtitle>
                  <IonList className="custom-ion-list" color="light" lines='full'>
                    <IonItem className='custom-ion-item' color='light'>
                      <IonLabel>Proteína: {el.nutritional_info.totalNutrients.PROCNT.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.PROCNT.unit}</IonLabel>
                    </IonItem>
                    <IonItem className='custom-ion-item' color='light'>
                      <IonText>Carbohidratos: {el.nutritional_info.totalNutrients.CHOCDF.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.CHOCDF.unit}</IonText>
                    </IonItem>
                    <IonItem className='custom-ion-item' color='light'>
                      <IonText>Azúcares: {el.nutritional_info.totalNutrients.SUGAR.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.SUGAR.unit}</IonText>
                    </IonItem>
                    <IonItem className='custom-ion-item' color='light'>
                      <IonText>Grasas: {el.nutritional_info.totalNutrients.FAT.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.FAT.unit}</IonText>
                    </IonItem>
                    <IonItem className='custom-ion-item' color='light'>
                      <IonText>Grasas saturadas: {el.nutritional_info.totalNutrients.FASAT.quantity.toFixed(2)}{el.nutritional_info.totalNutrients.FASAT.unit}</IonText>
                    </IonItem>

                  </IonList>
                </IonCardContent>
              </IonCard>
            })
          }
        </IonContent>
    </IonPage>
  )
}

export default historyDetails