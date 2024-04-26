import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { IonButton, IonContent, IonGrid, IonPage, IonRow, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCol, IonList, IonItem, IonLabel, IonAlert } from '@ionic/react';
import Cookies from 'js-cookie';
const URL = 'http://localhost:5001/food/'


const fetchFood = async(param, token)=>{
    const request = await fetch(URL+ param ,{method: 'GET',
    mode:'cors',
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Auth "+token
    }
  })
  const food = await request.json()
  return food
}

const foodDetails = () => {
    const { foodId } = useParams();
    const [cookies, setcookies] = useState('')
    const [data,setData] = useState({})

    useEffect(()=>{
        setcookies(Cookies.get('token'))
    },[])
    useEffect(()=>{
        if(cookies){
            fetchFood(foodId, cookies).then((data)=>{
                console.log(data)
                setData(data)
        })
        }
    }, [cookies])
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
                <IonTitle>{data?.food?.f_ori_name}</IonTitle>
            </IonToolbar>
        </IonHeader> 
        <IonContent style={{ '--ion-background-color': '#fff' }}>
        <IonList inset={true} color='light' lines='full'>
          {data?.food?.foodvalue.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{capitalizeFirstLetter(item.c_ori_name)}</h2>
                <p style={{ 'color': '#333' }}>{capitalizeFirstLetter(item.mu_descripcion)}</p>
                <p style={{ 'color': '#333' }}>{capitalizeFirstLetter(`${item.u_descripcion}: ${item.best_location || 0} ${item.v_unit}`)}</p>
                <p>{capitalizeFirstLetter(item.glos_esp || "")}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default foodDetails