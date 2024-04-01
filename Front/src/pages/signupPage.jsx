import { IonCol, IonPage, IonButton, IonContent, IonGrid, IonRow, IonHeader, IonToolbar, IonBackButton, IonButtons, IonTitle, IonFooter, IonNavLink } from '@ionic/react'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import Input from '../components/Input'
import './signupPage.css'
import Landing_SVG from '../components/Landing_SVG'

const SignupPage = () => {
    const [user, setUser] = useState({
        email:'',
        username:'',
        name:'',
        password:'',
        repeatedPassword: ''
    })
    const handleOnChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log(user)
        try{
            if(user.password!==user.repeatedPassword){
                console.log('Contraseñas distintas')
            }
            const response = await fetch('TODO/URL',{
                method: 'POST',
                mode:'cors',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

            if(response.ok){
                navigate('/login')
            }
        }catch(error){
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
                <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY="false" className='ion-padding'>
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
                        <Input label='Name:' name='name' value={user.name} handleChange={handleOnChange}placeholder={'John'}/>
                    </IonCol>
                    <IonCol>
                        <Input label='Username:' name='username' value={user.username} handleChange={handleOnChange}placeholder={'johndoe'}/>
                    </IonCol>
                </IonRow>
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
                <IonRow>
                    <IonCol>
                        <Input label='Repeat password:' name='repeatedPassword' type='password' value={user.repeatedPassword} handleChange={handleOnChange}placeholder={'********'}/>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                    <IonCol size='6' class="ion-text-center">
                        <IonButton color='light' shape='round' fill='outline' expand='full' onClick={handleSubmit}>Signup</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonContent>
            <IonFooter translucent={true}>
                <IonToolbar>
                    <IonTitle class='footer-title'>Already have an account? <Link to='/login'>Login</Link></IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
  )
}

export default SignupPage