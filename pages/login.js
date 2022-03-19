import axios from "axios";
import jsCookie from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const router = useRouter()
    const loginFormRef = useRef()

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        try{
            axios.post('/api/auth/login', {
                username: loginFormRef.current.username.value,
                password: loginFormRef.current.password.value
            }).catch((err) => {
                errorToast(String(err.response.data.message))
            }).then((res) => {
                try {
                    if(res.data.token){
                        jsCookie.set('_token', res.data.token)
                        successToast(`Logged in`)
                        let redirectTimer = setTimeout(() => {
                            router.push('/')
                        }, 1500)
                    }
                } catch (error) {
                    return
                }
            })
        }catch(err){
            errorToast(String(err))
        }
    }

    const errorToast = (msg) => {
        toast.error(msg)
    }

    const successToast = (msg) => {
        toast.success(msg)
    }

    return (
    <div className="flex items-center max-w-lg mx-auto justify-center h-screen">
        <Head>
            <title>Login</title>
        </Head>
        <div className="bg-white w-full rounded-lg border shadow-lg p-2">
            <div className="text-xl font-semibold text-center md:text-left">
                Login
            </div>
            <hr className="my-2"></hr>
            <form ref={loginFormRef} onSubmit={formSubmitHandler}>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">Username</label>
                    <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <hr className="my-2"></hr>
            <div>
                Don't have an account yet? <Link href={'/register'}><a className="font-semibold text-blue-700 cursor-pointer">Register</a></Link>
            </div>
        </div>
        <ToastContainer theme="colored" />
      </div>
    )
  }
  