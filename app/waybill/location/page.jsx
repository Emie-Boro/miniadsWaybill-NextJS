'use client'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const [location, setLocation] = useState()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/waybill`)
      .then(response => response.json())
      .then(data => setLocation(data))
      .catch(err => toast(err.message))
  }, [])
  return (
    <div>
      <ToastContainer />
      <div className='mx-auto'>
        <h1 className="text-xl font-bold">Miniads Store Waybill Locations</h1>
        {location?.map(item => (
          <div key={item._id} className='mb-5 hover:bg-light rounded border border-primary p-5'>
            <div className='flex flex-row justify-between text-lg font-bold text-primary'>
              <h3>{item.state}</h3>
              <h3>{item.city}</h3>
              <h3>{item.address}</h3>
              <h3>{item.phone}</h3>
            </div>
            <div className='flex flex-row justify-between font-semibold'>
              <p>NGN{item.price}</p>
              <p>Email: {item.email}</p>
              <p>Verification: {item.verified}</p>
              <p>{item.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
