import React from 'react'
import { IonInput } from '@ionic/react'

import './Input.css'

const Input = ({label, placeholder,value, handleChange, name, type}) => {
  return (
    <IonInput label={label} type={type||'text'} name={name} onIonInput={handleChange}value={value}placeholder={placeholder} labelPlacement="floating" fill="solid" class='custom' color='primary' shape='round'></IonInput>
  )
}

export default Input