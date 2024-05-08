import React, { useState, useEffect } from 'react'
import { IonIcon, IonNavLink, IonPage } from '@ionic/react';
import { IonContent, IonGrid, IonRow, IonCol, IonImg, IonToolbar,IonHeader, IonTitle, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader} from '@ionic/react';
import Cookies from 'js-cookie'


const HomePage = () => {
  
  const [cookie , setcookies] = useState('')
  const [data, setData] = useState([])

  useEffect(()=>{
    setcookies(Cookies.get('token'))
  },[])
  useEffect(()=>{
    if(cookie){
      fetch('http://localhost:5001/history',{
        method: 'GET',
        mode:'cors',
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Auth "+cookie
        }
    }).then((response)=> response.json()).then((newData)=>{
      setData(newData)
      console.log(newData)}
  )
    }
  },[cookie])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
        data?.history?.length > 0 ? (
          data.history.map((el, i) => (
            <IonCard color="light" routerLink="/foods" key={i}>
              <IonCardHeader>
                <IonCardTitle>{el.name}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))
        ) : (
          <IonTitle>No hay búsquedas previas</IonTitle>
        )}
      </IonContent>
    </IonPage>
  );
}

export default HomePage