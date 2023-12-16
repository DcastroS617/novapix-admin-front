import React from 'react'
import { NavigationBar } from './NavigationBar'

export const MainPage = () => {
    return (
        <>
            <div>
                <h4 className='ms-3 mt-2'>Novapix store</h4>
                <hr />
            </div>
            <NavigationBar />
            <div className='container mt-2'>
            </div>
        </>
    )
}
