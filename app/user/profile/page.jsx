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

  console.log(user)


  return (
    <div className="mx-auto w-60">
      <div className="sm:text-sm mb-5">
        <label htmlFor="" className="text-primary">Name</label>
        <h3 className="text-xl font-bold sm:text-lg sm:font-semibold">{user?.shipper.name}</h3>
        <span className="text-xs text-semi">{user?._id}</span>
      </div>
      <div className="sm:text-sm">
        <label htmlFor="" className="text-primary">Role</label>
        <h3 className="text-lg font-medium sm:text-sm">{user?.role}</h3>
      </div>
      <div className="sm:text-sm my-5">
        <label htmlFor="">Email</label>
        <h3 className="text-lg font-medium sm:text-sm">{user?.email}</h3>
      </div>
      <div className="sm:text-sm my-5">
        <label htmlFor="">Phone</label>
        <h3 className="text-lg font-medium sm:text-sm">{user?.shipper.phone}</h3>
      </div>
      <div className="sm:text-sm">
        <label htmlFor="">Office</label>
        <h3 className="text-lg font-medium sm:text-sm">{user?.shipper.office}</h3>
      </div>
      <div className="sm:text-sm my-5">
        <label htmlFor="">Username</label>
        <h3 className="text-lg font-medium sm:text-sm">{user?.username}</h3>
      </div>
      <div className="sm:text-sm my-5">
        <label htmlFor="">Verification</label>
        <h3 className="text-lg font-medium sm:text-sm">{user?.shipper.verified}</h3>
      </div>
    </div>
  );
}

export default Page;
