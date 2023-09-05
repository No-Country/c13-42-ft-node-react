export const formatDatesArray = (arr: []) =>{
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

    const formated = arr.map((item: any)=>{
        item.date = item.date.toLocaleDateString(undefined, options)
        return item
    })

    return formated
    
}
export const formatDate = (date: any) =>{
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

    const formated = date.toLocaleDateString(undefined, options)
        

    return formated
    
}