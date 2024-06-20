'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const router = useRouter();
  const [data, setData] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('miniads89283_token');
      if (!token) {
        router.push('/user/login');
      } else {
        setData(token)
      }
    }
  }, [router]);  

  const [location, setLocation] = useState({
    state: '',
    city: '',
    address: '',
    price: '',
    phone: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/waybill/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLocation({
          state: '',
          city: '',
          address: '',
          price: '',
          phone: '',
          email: ''
        })
        toast('Location added Successfully')
      })
      .catch(err => toast(err.message))
  }
  return (
    <div>
      <ToastContainer />
      <div className="mx-auto w-60">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-5">
            <label htmlFor="">State</label>
            <input type="text" value={location.state} onChange={(e) => setLocation({ ...location, state: e.target.value })} placeholder="Lagos State" />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="">City/Town</label>
            <input type="text" value={location.city} onChange={(e) => setLocation({ ...location, city: e.target.value })} placeholder="Ikoyi" />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="">Address</label>
            <input type="text" value={location.address} onChange={(e) => setLocation({ ...location, address: e.target.value })} placeholder="#24 Capital City..." />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="">Price</label>
            <input type="number" value={location.price} onChange={(e) => setLocation({ ...location, price: e.target.value })} className="border border-light rounded-lg" />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="">Phone</label>
            <input type="tel" value={location.phone} onChange={(e) => setLocation({ ...location, phone: e.target.value })} placeholder="000 0000 0000" />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="">Email</label>
            <input type="email" value={location.email} onChange={(e) => setLocation({ ...location, email: e.target.value })} placeholder="location@company.com" />
          </div>
          <button type="submit" className="bg-primary hover:bg-semi p-2 text-white">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page
