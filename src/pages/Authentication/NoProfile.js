import React from 'react'
import Cookies from 'js-cookie'
const NoProfile = () => {
  let firstLetter=[]
  if(Cookies.get('name') && JSON.parse(sessionStorage.getItem('uid'))){
    const name=Cookies.get('name') 
   firstLetter =name.split('')
  }
  
  return (
    <div>
 <div className='d-flex justify-content-center align-items-center bg-primary text-light' style={{ width:'70px',height:'70px',borderRadius:'50px',fontSize:'x-large'}}>{firstLetter[0]}</div>
    </div>
   
  )
}

export default NoProfile