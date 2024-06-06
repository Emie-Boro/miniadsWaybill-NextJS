'use client'
import { jwtDecode } from "jwt-decode"; // Import jwtDecode correctly as a named import
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState()
  
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('miniads89283_token');
      if (!token) {
        router.push('/user/login');
      } else {
        setUser(jwtDecode(token).user)
      }
    }
  }, [router]);



  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
        <h3 className="text-2xl font-bold">{user?.shipper.name}</h3>
      </div>
    </div>
  );
}

export default Page;
