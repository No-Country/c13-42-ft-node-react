import { baseUrl } from "../constants";

export const addToWishlist = async (productId: string,  userId: string ) => {
    const response = await fetch(`${baseUrl}/api/v0/wishlist`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({productId, userId}) 
      });
      const data = response.json()
      return data
}


export const removeFromWishlist = async (products: [{id: string}],  userId: string ) => {
  const response = await fetch(`${baseUrl}/api/v0/wishlist`, {
      method: 'PATCH', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({products, userId}) 
    });
    const data = response.json()
    return data
}


