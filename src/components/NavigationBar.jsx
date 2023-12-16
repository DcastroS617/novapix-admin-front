import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { NavItem } from '../customs/NavItem';


export const NavigationBar = () => {

    const [userID, setUserID] = useState("")
    const navigate = useNavigate()

    const handleUserLogged = () => {
        const cookies = Cookies.get("userID")
        if (cookies) {
            setUserID(cookies)
        } else {
            setUserID("")
        }
    }

    useEffect(() => {
        handleUserLogged()
    })

    const handleLoginTransaction = async () => {
        if (userID) {
            const response = await fetch(`http://localhost:7077/api/logout`, {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200)
                navigate('/')
        } else{
            navigate('/login')
        }
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light mb-2 p-3">
                    <ul className="navbar-nav">
                        <li className="nav-item"><NavLink to='/' className="nav-link">Home</NavLink></li>
                        <NavItem to='/cart' title='Orden' userID={userID} />
                        <NavItem to='/profile' title='Perfil' userID={userID} />
                        <li className='nav-item'><button className="nav-link" onClick={handleLoginTransaction}>{userID ? 'Log out' : 'Log in'}</button></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
