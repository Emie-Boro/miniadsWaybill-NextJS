'use client'
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Page = () => {
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('miniads89283_token');
      if (!token) {
        router.push('/user/login');
      } else {
        const timeRemaing = jwtDecode(token).exp * 1000 - Date.now();
        if (timeRemaing <= 0) {
          console.log(`${timeRemaing} Remaining`)
          toast('Token Expired...')
          localStorage.removeItem('miniads89283_token')
          router.push('/user/login');
        }
        setUser(jwtDecode(token).user)

        fetch('/api/waybill/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => response.json())
          .then(data => setLocations(data))
          .catch(err => toast(err.message));
      }
    }

    checkToken()
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className='mx-auto p-5'>
      <ToastContainer />
      <h1 className='text-wrap text-2xl font-bold sm:text-lg'>{user.shipper.name}</h1>
      <h4 className='sm:text-sm'>Your Waybill Locations</h4>
      <div>
        {locations?.map(item => (
          <div key={item._id} className='mb-5 rounded border border-primary p-5'>
            <div className='flex flex-row flex-wrap justify-between'>
              <h3 className='text-lg md:text-sm font-bold text-primary sm:text-sm'>{item.state}, {item.city}, {item.address}</h3>
              <p className='md:text-sm sm:text-xs'>NGN{item.price}</p>
              <p className='md:text-sm sm:text-xs'>Verification: {item.verified}</p>
            </div>
            <button className='mt-2'><Link href={`/waybill/update/${item._id}`} className='text-sm p-2 bg-semi hover:bg-light sm:text-xs'>Update</Link></button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page;
