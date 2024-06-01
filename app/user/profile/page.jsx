'use client'
import { jwtDecode } from "jwt-decode"

const page = () => {
  const token = localStorage.getItem('miniads89283_token')

  if (!token) redirect('/user/login')

  const user = jwtDecode(token).user

  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
        <h3>{user.shipper.name}</h3>
      </div>
    </div>
  )
}

export default page