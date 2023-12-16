import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const userDTO = {
    email: "",
    password: ""
}

export const LoginPage = () => {

    const [user, setUser] = useState(userDTO)
    const navigate = useNavigate()

    const handleInputChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleLogin = async () => {
        try {
            validateInput(user.email, user.password)
            console.log(process.env.NOVAPIX_API)
            const result = await fetch(`http://localhost:7077/api/login`, {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if(result.status === 200){
                navigate('/')
            }

            
        } catch (error) {
            swal({
                icon: 'error',
                title: 'acceso no autorizado',
                text: error.message
            })
        }
    }

    const handleCancelLogin = () => {
        setUser(userDTO)
        navigate('/')
    }

    const validateInput = (email, password) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email === '' || password === '') {
            throw new Error("Los campos de credenciales se encuentran vacios")
        }
        else if (!emailRegex.test(email)) {
            throw new Error("El campo de email debe ser un correo electrónico válido")
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <input type="text" name='email' value={user.email} onChange={handleInputChange} placeholder='email' />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <input type="password" name='password' value={user.password} onChange={handleInputChange} placeholder='Contraseña' />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <button onClick={handleCancelLogin}>Cancelar</button>
                    <button onClick={handleLogin}>Log in</button>
                </div>
            </div>
        </div>
    )
}
