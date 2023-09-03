export const formatDatesArray = (arr: []) =>{
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

    const formated = arr.map((item: any)=>{
        item.date = item.date.toLocaleDateString(undefined, options)
        return item
    })

    return formated
    
}