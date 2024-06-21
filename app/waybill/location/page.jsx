'use client'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
  const [location, setLocation] = useState()

  useEffect(() => {
    const fetchWaybill = () => {
      fetch('/api/waybill')
        .then(response => response.json())
        .then(data => setLocation(data))
        .catch(err => toast(err.message))
    }

    fetchWaybill()
  }, [])
  return (
    <div>
      <ToastContainer />
      <div className='mx-auto'>
        <h1 className="text-xl font-bold sm:text-sm sm:font-semibold">Miniads Store Waybill Locations</h1>
        {location?.map(item => (
          <div key={item._id} className='mb-5 hover:bg-light rounded border border-primary p-5'>
            <div className='flex flex-wrap flex-row justify-between text-lg font-bold text-primary sm:text-sm'>
              <h3 className='text-lg md:text-sm font-bold text-primary sm:text-sm'>{item.state}, {item.city}, {item.address}</h3>
            </div>
            <div className='flex flex-wrap flex-row justify-between font-semibold sm:text-xs'>
              <p>NGN{item.price}</p>
              <p>Email: {item.email}</p>
              <p className=''>Verification: {item.verified}</p>
              <p>{item.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
