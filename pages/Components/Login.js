import React, { useContext, useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import Navbar from './Navbar'
import { UserContext } from "../Helper/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {user, setUser} = useContext(UserContext)
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("test");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).then((response) => setUser(response.user));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
    <Navbar/>
    <div className='flex justify-center m-auto min-h-screen bg-[#000000] md:bg-[#0b0a0f] h-screen md:h-full shadow-lg shadow-white'>
      <div className=' md:mt-[10%]  text-[#ffffff] shadow-xl   flex-col flex rounded-xl md:p-40 bg-[#000000]  my-auto'>
        <h1 className='mx-auto text-3xl font-bold shadow-2xl '>LOGIN</h1>

        <form className='p-6 mx-auto text-black' onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            type='email'
            className='border-gray-400 border my-2 px-2 py-2 w-full rounded-xl outline-none focus:border-[#222223]'
            placeholder='Email'
          />

          <input
            type='password'
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            className='border-gray-400 border px-2 my-2  w-full py-2 rounded-xl outline-none focus:border-[#222223]'
            placeholder='Password'
          />
          <button
            type='submit'
            className='block my-2 w-full max-w-xs mx-auto  bg-[#02bcff] duration-200 hover:bg-[#0d8eff] focus:bg-[#222223] text-white rounded-lg px-3 py-3 font-semibold'
          >
            Sign Up
          </button>
        </form>
        <div className='mx-auto'>
          Don't have an Account?
          
            <Link className="font-bold" href='/Components/SignUp'>Register</Link>
          
        </div>
      </div>

      </div>
    </div>
  );
}
