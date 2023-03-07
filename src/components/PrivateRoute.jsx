import React, { useContext, useEffect } from 'react'
import { SessionContext } from '../Contexts/SessionContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {


const { isLoading, isAuthenticated } = useContext(SessionContext)



    if (!isLoading && !isAuthenticated) {
        return <Navigate to='/login' />
    }
    
      return <>{children}</>
}



