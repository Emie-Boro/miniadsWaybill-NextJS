'use client'
import { useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const token = sessionStorage.getItem('miniads89283_token')
    if(token) redirect('/user/dashboard')
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                if (!response.ok) {
                    toast('Email or Password is Incorrect');
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    toast('Login Successful')
                    sessionStorage.setItem('miniads89283_token', data.token)
                    router.push('/user/dashboard')
                }
            })
            .catch(err => {
                toast(err.message)
            })
    }


    return (
        <div>
            <ToastContainer />
            <div className="mx-auto w-56">
                <form className='text-sm' onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='user@company.com' />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='secret password' />
                    </div>
                    <button type="submit" className="bg-primary text-white p-2 hover:bg-light">Login</button>
                </form>
            </div>
        </div>
    )
}

export default page
