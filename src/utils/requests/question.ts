import { baseUrl } from "../constants";

export const postQuestion = async (productId: string, content: string, userId: string ) => {
    const response = await fetch(`${baseUrl}/api/v0/questions`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({productId, content, userId}) 
      });
      const data = response.json()
      return data 
      
}


