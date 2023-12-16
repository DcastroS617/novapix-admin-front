import React from 'react'
import { BsTrash3 } from 'react-icons/bs'


const letters = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'i', 'k', 'l', 1, 2, 3, 4, 5, 6];

export const CartPageContent = ({ userCart, products, setFinishPurchase, isFinishPurchase, setUserToken }) => {

    const handleClientToken = async () => {
        const clientTokenResponse = await fetch('http://localhost:7077/api/token/', {
            credentials: "include",
            mode: "cors"
        })
        const result = await clientTokenResponse.json()
        console.log(result)
        setUserToken(result.clientToken)
        setFinishPurchase(!isFinishPurchase)

    }

    const keyGenerator = () => {
        let key = '';
        for (let i = 0; i < 5; i++) {
            const randomNumber = Math.round(Math.random() * (letters.length - 1));
            key += letters[randomNumber]
        };
        console.log(key)
        return key;
    }

    return (
        <>
            <div className='container w-50'>
                <div className='row'>
                    <div className='col'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item) => (
                                    <tr key={keyGenerator()}>
                                        <td>{item.productName}</td>
                                        <td>{item.productPrice}</td>
                                        <td><button className='btn btn-primary'><BsTrash3 /></button></td>
                                    </tr>
                                ))}
                                <tr>
                                    <th>Subtotal</th>
                                    <td>{userCart.subtotal}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='row'>
                            <div className='col text-end'>
                                <button className='btn btn-outline-success' onClick={handleClientToken}>Finalizar Compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
