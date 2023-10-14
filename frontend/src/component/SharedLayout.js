import React from 'react'
import {Outlet} from "react-router-dom"
import Navhead from './navhead'

const HomePage = () => {

  return (

    <div >

        <Navhead />
        <Outlet />

    </div>

  )

}

export default HomePage
