'use client'
import { redirect } from 'next/navigation'
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const page = () => {
  const [locations, setLocations] = useState()
  const token = sessionStorage.getItem('miniads89283_token')
  
  if (!token) redirect('/user/login')

  const user = jwtDecode(token)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/waybill/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.json())
      .then(data => setLocations(data))
      .catch(err => toast(err.message))
  }, [])

  return (
    <div className='mx-auto p-5'>
      <ToastContainer />
      <h1 className='text-wrap text-2xl font-bold'>{user.user.shipper.name}</h1>
      <h4>Your Waybill Locations</h4>
      <div>
        {locations?.map(item => (
          <div key={location._id}>
            <div key={item._id} className='mb-5 rounded border border-primary p-5'>
              <div className='flex flex-row justify-between text-lg font-bold text-primary'>
                <h3>{item.state}, {item.city}, {item.address}</h3>
              </div>
              <div className='flex flex-row justify-between font-semibold'>
                <p>NGN{item.price}</p>
                <p>Verification: {item.verified}</p>
                <Link href={`/waybill/update/${item._id}`} className='p-2 bg-semi hover:bg-light'>Update</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
