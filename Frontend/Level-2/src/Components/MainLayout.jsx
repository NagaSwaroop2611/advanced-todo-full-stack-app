import React from 'react'
import Header from './Header'
import CopyrightNotice from "./CopyrightNotice"

const MainLayout = ({children}) => {
  return (
    <div className="layout-container-div">
      <Header/>
      {children}
      <CopyrightNotice/>
    </div>
  )
}

export default MainLayout;
