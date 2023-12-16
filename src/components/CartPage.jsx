import React, { useEffect, useState, } from 'react'
import { NavigationBar } from './NavigationBar'
import { CartPageContent } from './CartPageContent'
import { CartPageForm } from './CartPageForm'
import swal from 'sweetalert'

const cartDTO = {
    "_id": "",
    "userId": "",
    "email": "",
    "products": [],
    "subtotal": 0,
    "state": false,
    "createdAt": "",
    "updatedAt": ""
}

export const CartPage = () => {

    const [userCart, setUserCart] = useState(cartDTO)
    const [products, setProducts] = useState([])
    const [isFinishPurchase, setFinishPurchase] = useState(false)
    const [userToken, setUserToken] = useState("")
    const [dropInstance, setDropInstance] = useState({})
    const [error, setError] = useState(false)

    const handleCartData = async () => {
        try {
            const result = await fetch(`http://localhost:7077/api/cart/`, {
                method: "GET",
                credentials: "include",
                mode: "cors",
            })
            //handleError(response.cart)
            if (result.status === 404) {
                setError(true)
            }
            const response = await result.json()
            const ids = response.cart.products.map(item => item.productId)
            const request = {}
            request.ids = ids
            console.log(ids)
            const responseProducts = await fetch(`http://localhost:7077/api/product/selected`, {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            const resultProducts = await responseProducts.json()
            //resultProducts.push(response.product)
            setProducts(resultProducts.products)
            setUserCart(response.cart)

        } catch (errorMessage) {
            console.log('404')
        }
    }

    useEffect(() => {
        handleCartData()
    }, [])

    const clearForm = () => {
        setDropInstance({})
        if (isFinishPurchase) {
            setFinishPurchase(!isFinishPurchase)
        }
        setUserCart(cartDTO)
        setProducts([])
        setUserToken('')
        swal({
            title: 'Compra finalizada',
            text: 'la compra se realizó con éxito',
            icon: 'success'
        })
    }

    if (error) {
        return (
            <>
                <div>
                    <h4 className='ms-3 mt-2'>Novapix cart</h4>
                    <hr />
                </div>
                <NavigationBar />
                <div className='container mt-2'>
                    <h4>No has seleccionado productos.</h4>
                </div>
            </>
        )
    } else {
        if (isFinishPurchase) {
            return (
                <>
                    <div>
                        <h4 className='ms-3 mt-2'>Novapix cart</h4>
                        <hr />
                    </div>
                    <NavigationBar />
                    <div className='container mt-2'>
                        <CartPageForm userToken={userToken} setFinishPurchase={setFinishPurchase}
                            isFinishPurchase={isFinishPurchase} setDropInstance={setDropInstance}
                            dropInstance={dropInstance} products={userCart.products}
                            clearForm={clearForm} />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div>
                        <h4 className='ms-3 mt-2'>Novapix cart</h4>
                        <hr />
                    </div>
                    <NavigationBar />
                    <div className='container mt-2'>
                        <CartPageContent userCart={userCart} products={products}
                            setFinishPurchase={setFinishPurchase} isFinishPurchase={isFinishPurchase}
                            setUserToken={setUserToken} />
                    </div>
                </>
            )
        }

    }
}
