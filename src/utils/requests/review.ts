export const postReview = async (productId: string, content: string, userId: string, score: number, title: string ) => {
    const response = await fetch(`http://localhost:3000/api/v0/reviews`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({productId, content, userId, score, title}) 
      });
      const data = response.json()
      return data
}


