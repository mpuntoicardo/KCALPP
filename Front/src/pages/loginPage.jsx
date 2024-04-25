import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { IonButton, IonContent, IonGrid, IonPage, IonRow, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCol, IonFooter, IonAlert } from '@ionic/react';
import {Link,Redirect} from 'react-router-dom'

import './signupPage.css'
import Landing_SVG from '../components/Landing_SVG';
import Cookies from 'js-cookie';

const URL = "http://localhost:5001/login"

const loginPage = () => {

    const [user, setUser] = useState({
        email:'',
        password:''
    })
    const [redirect, setRedirect] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const handleOnChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log(user)
        try{
            const response = await fetch(URL,{
                method: 'POST',
                mode:'cors',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            if(response.ok){
                const data = response.json()
                Cookies.set('token',data.token,{ expires: 7, secure: true, sameSite: 'strict' });
                setRedirect(true)
            }else{
                setShowErrorMessage(true)
            }
        }catch(error){
            setShowErrorMessage(true)
            console.log(error)
        }
    }
  return (
    <IonPage>
        <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>   
        <IonContent>
        <div class="registerHead">
                <div class="ion-text-center">
                    <h1 class="titleRegister"><strong>KCALPP</strong></h1>
                </div>
                <div>
                    <Landing_SVG class="landing-image"></Landing_SVG>
                </div>
            </div>
        <IonGrid>
            <IonRow>
                <IonCol>
                    <Input label='Email:' name='email' value={user.email} handleChange={handleOnChange}placeholder={'example@gmail.com'}/>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <Input label='Password:' name='password' type='password' value={user.password} handleChange={handleOnChange}placeholder={'********'}/>
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <IonCol size='6'>
                    <IonButton color='light' shape='round' fill='outline' expand='full' onClick={handleSubmit}>Login</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
        </IonContent>
        <IonFooter translucent={true}>
                <IonToolbar>
                    <IonTitle class='footer-title'>Don't have an account? <Link to='/signup'>Signup</Link></IonTitle>
                </IonToolbar>
        </IonFooter>
        {redirect? <Redirect to='/home'></Redirect>:null}
        <IonAlert
        isOpen={showErrorMessage}
        header='Login incorrecto'
        message='El email y/o contraseña son incorrectos'
        buttons={['Cerrar']}
        onDidDismiss={() => setShowErrorMessage(false)}
        ></IonAlert>
    </IonPage>
  )
}

export default loginPage
