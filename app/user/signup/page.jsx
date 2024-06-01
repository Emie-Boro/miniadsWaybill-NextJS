'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [shipper, setShipper] = useState({
        name: '',
        office: '',
        phone: ''
    })

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(passwordCheck !== password) {
            toast('Password do not match')
            return
        }

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                username,
                shipper,
            })
        })
            .then(response => response.json())
            .then(data => {
                toast(data)
                router.push('/user/login')
            })
            .catch(err => toast(err.message))
    }

    return (
        <div>
            <ToastContainer />
            <div className="mx-auto w-56">
                <form className='text-sm' onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Must be unique' />
                    </div>
                    <h4 className="my-5">Shipper's Information</h4>
                    <hr />
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">name</label>
                        <input type="text" value={shipper.name} onChange={(e) => setShipper({...shipper, name:e.target.value})} placeholder='Shipper Company Name' />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">office</label>
                        <input type="text" value={shipper.office} onChange={(e) => setShipper({...shipper, office: e.target.value})} placeholder='Address' />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Phone</label>
                        <input type="tel" value={shipper.phone} onChange={(e) => setShipper({...shipper, phone: e.target.value})} placeholder='number' />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='user@company.com' />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} placeholder='retype password' />
                    </div>
                    <button type="submit" className="bg-primary text-white p-2 hover:bg-light">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default page
