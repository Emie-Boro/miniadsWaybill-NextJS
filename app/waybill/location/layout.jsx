'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
    const [token, setToken] = useState()

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('miniads89283_token')
        if (token) {
            setToken(token)
        }
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem('miniads89283_token')
        router.push('/user/login')
    }

    return (
        <header className='pb-5'>
            <nav className='flex justify-between text-sm'>
                <ul className='text-sm flex flex-row'>
                    <li>{token ? <Link className='mr-5 hover:text-primary' href={'/user/dashboard'}>Dashboard</Link> : <Link className='mr-5 hover:text-primary' href={'/'}>Home</Link>}</li>
                    {token && <li><Link className='' href={'/waybill/new'}>New Location</Link></li>}
                </ul>
                <ul className='flex items-center'>
                    <li><Link className='mr-5 hover:text-primary' href={'/waybill/location'}>Locations</Link></li>
                    <li>{token ? <button className='mr-5 p-2 bg-light text-white' onClick={handleLogout}>Logout</button> : <Link className='mr-5 hover:text-primary' href={'/user/login'}>Login</Link>}</li>
                </ul>
            </nav>
        </header>
    )
}


export default function DashboardLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}