'use client'
import { useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}