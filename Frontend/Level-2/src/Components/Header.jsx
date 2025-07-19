import React from 'react'
import wsaLogo from '../assets/wsa-logo.svg'

export default function Header() {
  return (
    <div className='header-container-div'>
      <img src={wsaLogo} alt="WSA Logo" width={182} height={62}/>
    </div>
  )
}
 