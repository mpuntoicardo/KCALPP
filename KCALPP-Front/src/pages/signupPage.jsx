import { IonCol, IonPage, IonButton, IonContent, IonGrid, IonRow } from '@ionic/react'
import React, { useState } from 'react'

import Input from '../components/Input'

const signupPage = () => {
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
        <IonContent>
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
                <Input label='Email:' name='email' value={user.email} handleChange={handleOnChange}placeholder={'example@gmail.com'}/>
            </IonRow>
            <IonRow>
                <Input label='Password:' name='password' type='password' value={user.password} handleChange={handleOnChange}placeholder={'********'}/>
            </IonRow>
            <IonRow>
                <Input label='Repeat password:' name='repeatedPassword' type='password' value={user.repeatedPassword} handleChange={handleOnChange}placeholder={'********'}/>
            </IonRow>
            <IonRow>
                <IonButton shape='round' fill='solid' onClick={handleSubmit}>Signup</IonButton>
            </IonRow>
        </IonGrid>
        </IonContent>
    </IonPage>
  )
}

export default signupPage