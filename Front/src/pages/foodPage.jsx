import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton,IonTitle, IonPage, IonList,IonSearchbar, IonItem } from '@ionic/react'
import React, { useEffect, useState } from 'react'

import './foodPage.css'

const food = {
    food: [
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      },
      {
        f_eng_name: "Potato, roast",
        f_id: "2402",
        f_ori_name: "Patata, asada"
      },
      {
        f_eng_name: "Potato, raw",
        f_id: "2403",
        f_ori_name: "Patata, cruda"
      }
    ]
  }
const foodPage = () => {

    const [searchQuery, setSearch] = useState('')

    const handleInput = (e)=>{
        setSearch(e.target.value)
    }

    const [foods, setFoods] = useState({})

    useEffect(()=>{
        setFoods(food)
        console.log(foods)
    },[foods])

    return (
        <IonPage>
                <IonHeader>
                        <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton></IonBackButton>
                        </IonButtons>
                        <IonTitle>Foods</IonTitle>
                        </IonToolbar>
                        <IonToolbar>
                            <IonSearchbar showClearButton="focus" value={searchQuery} onInput={handleInput} debounce={1000}></IonSearchbar>
                        </IonToolbar>
                    </IonHeader> 
            <IonContent className='foodsBg'>
                <IonList inset={true} color='light' lines='full'> 
                    {
                        foods?.food?.map((el, i)=>
                            <IonItem key={i} >{el.f_ori_name}</IonItem>
                            )
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default foodPage