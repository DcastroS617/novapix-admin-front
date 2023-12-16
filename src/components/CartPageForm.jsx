import React, { useCallback, useEffect } from 'react'
import dropin from 'braintree-web-drop-in'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const CartPageForm = ({ userToken, setFinishPurchase, isFinishPurchase, setDropInstance,
    dropInstance, products, clearForm }) => {

    const navigate = useNavigate()


    const handleCancelPurchase = () => {
        setFinishPurchase(!isFinishPurchase)
    }

    const handleDropinContainer = useCallback(async () => {
        try {
            const newDropInstance = await dropin.create({
                authorization: userToken,
                container: '#dropin-container',
                dataCollector: true
            })

            setDropInstance(newDropInstance)

        } catch (error) {
            console.log(error);
        }
    }, [setDropInstance, userToken])

    useEffect(() => {
        handleDropinContainer()
    }, [handleDropinContainer])

    const handleFinishPayment = useCallback(async () => {
        try {
            const userID = Cookies.get("userID")
            const username = Cookies.get('username')
            if (dropInstance) {
                const payload = await dropInstance.requestPaymentMethod()
                console.log("Payload nonce: " + payload.nonce)
                console.log("Payload device data: " + payload.deviceData)
                const request = {
                    userId: userID,
                    username: username,
                    nonce: payload.nonce,
                    deviceData: payload.deviceData,
                    products: products
                }
                const response = await fetch("http://localhost:7077/api/checkout/", {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request)
                })

                const result = await response.json()
                console.log(result)

            }
            clearForm()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }, [dropInstance, products, navigate, clearForm])

    return (
        <div>
            <h4>Finalizar la orden</h4> <hr />
            <div className='container w-50'>
                <div className='row'>
                    <div className='col'>
                        <div id='dropin-container' className='mb-3'></div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-end'>
                        <button onClick={handleCancelPurchase} className='btn btn-outline-secondary me-2'>Cancelar</button>
                        <button onClick={handleFinishPayment} className='btn btn-outline-success'>Finalizar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
