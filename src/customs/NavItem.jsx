import React from 'react'
import { NavLink } from 'react-router-dom'
export const NavItem = ({title, to, userID}) => {
    if(userID){
        return (
            <li className='nav-item'><NavLink to={to} className='nav-link'>{title}</NavLink></li>
          )
    } else {
        return null
    }
}
