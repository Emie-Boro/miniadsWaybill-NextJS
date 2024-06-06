'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('miniads89283_token');
            if (token) router.push('/user/dashboard');
        }
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    toast('Login Successful');
                    localStorage.setItem('miniads89283_token', data.token);
                    router.push('/user/dashboard');
                }
            })
            .catch(err => {
                toast(err.message);
            });
    }

    return (
        <div>
            <ToastContainer />
            <div className="mx-auto w-56">
                <form className='text-sm' onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='user@company.com'
                        />
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='secret password'
                        />
                    </div>
                    <button type="submit" className="bg-primary text-white p-2 hover:bg-light">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Page;
