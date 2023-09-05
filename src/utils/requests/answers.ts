export const postAnswer = async (questionId: number, content: string, userId: string ) => {
    const response = await fetch(`http://localhost:3000/api/v0/answers`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({questionId, content, userId}) 
      });
      const data = response.json().then(data => {
        console.log(data);
        
        return data 
      }).catch((error) => {
        console.log(error)
        return null
    })
    return data
}


