import React from 'react'
import logo from "../assets/loopLogo.png"

function OpenScrean() {
  return <div className=' h-[calc(100vh-85px)] w-full flex items-center justify-center fixed top-0 left-0 right-0 bottom-0'>
    <img className='w-32 ping ' src={logo} alt="" />

  </div>
}

export default OpenScrean