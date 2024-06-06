'use client'
import { NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"

const page = () => {
  const [user, setUser] = useState()
  const token = sessionStorage.getItem('miniads89283_token')

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token).user)
    }
  }, [token])

  if(!token) redirect('/user/login')

  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
        <h3 className="text-2xl font-bold">{user?.shipper.name}</h3>
      </div>
    </div>
  )
}

export default page
