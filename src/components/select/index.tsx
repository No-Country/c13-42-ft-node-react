import { ProductContext } from '../../pages/[category]/index'
import { useContext } from 'react'

export default function SelectOptions() {
const { setSelectOptions } = useContext(ProductContext)

  function changed(event) {
    setSelectOptions(event.target.value)    
  }
  return(
    <select className='w-[300px] mx-11 py-1 bg-whiteLight border-grayLight border-solid border-2 rounded-lg' onChange={changed}>
      <option value="">
          Ordenar por
      </option>
      <option value="Menor a mayor">Menor a mayor precio</option>
      <option value="Mayor a menor">Mayor a menor precio</option>
    </select>
  )
}