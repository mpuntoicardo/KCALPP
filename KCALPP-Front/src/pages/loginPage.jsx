import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { IonButton, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { navigate } from 'ionicons/icons';

const loginPage = () => {

    const [user, setUser] = useState({
        email:'',
        password:''
    })
    const handleOnChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log(user)
        try{
            const response = await fetch('TODO/URL',{
                method: 'POST',
                mode:'cors',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

            if(response.ok){
                navigate('/home')
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <IonPage>     
        <IonContent>
        <IonGrid>
            <IonRow>
                <Input label='Email:' name='email' value={user.email} handleChange={handleOnChange}placeholder={'example@gmail.com'}/>
            </IonRow>
            <IonRow>
                <Input label='Password:' name='password' type='password' value={user.password} handleChange={handleOnChange}placeholder={'********'}/>
            </IonRow>
            <IonRow>
                <IonButton shape='round' fill='solid' onClick={handleSubmit}>Login</IonButton>
            </IonRow>
        </IonGrid>
        </IonContent>
    </IonPage>
  )
}

export default loginPage
