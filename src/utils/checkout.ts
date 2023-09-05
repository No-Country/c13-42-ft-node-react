import { Product, User } from "@prisma/client";
import { baseUrl } from "./constants";

export const getCheckoutUrl = async () => {
    const response = await fetch(`${baseUrl}/api/v0/checkout`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({user: 'hola', products: 'sda'}) 
      });
      const data = response.json().then(data => {
        console.log(data);
        
        return data.url // JSON data parsed by `data.json()` call
      }).catch((error) => {
        console.log(error)
        return null
    })
      
      return data 
}

