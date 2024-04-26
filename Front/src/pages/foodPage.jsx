import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton,IonTitle, IonPage, IonList,IonSearchbar, IonItem } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

import './foodPage.css'


const URL = "http://localhost:5001/food?q="

const fetchFood = async(param, token)=>{
    const request = await fetch(URL+ (param || 'P'),{method: 'GET',
    mode:'cors',
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Auth "+token
    }
  })
  const food = await request.json()
  return food
}

const foodPage = () => {

    const [searchQuery, setSearch] = useState('')

    const handleInput = (e)=>{
        setSearch(e.target.value)
        console.log(foods)
    }
    const [cookies, setcookies] = useState('')
    const [foods, setFoods] = useState({})
    useEffect(()=>{
      setcookies(Cookies.get('token'))
    },[])
    useEffect(()=>{
      if(cookies){
        fetchFood(searchQuery,cookies).then((data)=>{setFoods(data)})
      }
    },[cookies, searchQuery])

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
                        foods?.food?.length > 1?
                        foods?.food?.map((el, i)=>
                            <IonItem key={i} routerLink={`/foods/${el.f_id}`}>{el.f_ori_name}</IonItem>
                            )
                          :
                          <IonItem routerLink={`/foods/${foods?.food?.f_id}`}>{foods?.food?.f_ori_name}</IonItem>
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default foodPage