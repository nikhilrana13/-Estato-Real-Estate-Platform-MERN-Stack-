import React, { useEffect, useState } from 'react'

const useDebounce = (value,delay = 500) => {
    const [debounceValue,setdebounceValue] = useState(value)

    useEffect(()=>{
      const handler = setTimeout(() => setdebounceValue(value),delay);
      // clear timeout
      return (()=> clearTimeout(handler))
    },[value,delay])
  return debounceValue
}

export default useDebounce