'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState()

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
        }
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/user/login')
    }

    return (
        <header className='pb-5 text-sm'>
            <nav className='flex justify-between'>
                <ul className='flex items-center'>
                    <li><Link className='mr-5' href={'/'}>Home</Link></li>
                    <li><Link className='mr-5' href={'/waybill/location'}>Locations</Link></li>
                </ul>
                <ul className=' flex flex-row items-center'>
                    <li><Link className='mr-5 hover:text-white hover:bg-light bg-primary text-white p-2' href={'/user/signup'}>Signup</Link></li>
                    <li><Link className='' href={'/user/login'}>Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}