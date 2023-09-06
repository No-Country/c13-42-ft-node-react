export default function rounded(precio: number){
    const rounded = Math.round(precio).toFixed(2)
    return rounded
}