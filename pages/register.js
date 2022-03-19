import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
    const registerFormRef = useRef()
    const router = useRouter()

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        try{
            axios.post('/api/auth/register', {
                username: registerFormRef.current.username.value,
                password: registerFormRef.current.password.value
            }).catch(err => {
                errorToast(String(err.response.data.message))
            }).then((res) => {
                try {
                    console.log(res.data)
                    successToast(`Successfully Registered`, {
                        hideProgressBar:true
                    })
                    let redirectTimer = setTimeout(() => {
                        router.push('/login')
                    }, 1500)
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

    const successToast = (msg, options) => {
        if (options){
            toast.success(msg, options)
            return
        }
        toast.success(msg)
    }

    return (
        <div className="flex items-center max-w-lg mx-auto justify-center h-screen">
            <Head>
                <title>Register</title>
            </Head>
            <div className="bg-white w-full rounded-lg border shadow-lg p-2">
                <div className="text-xl font-semibold text-center md:text-left">
                    Register
                </div>
                <hr className="my-2"></hr>
                <form ref={registerFormRef} onSubmit={formSubmitHandler}>
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
                    Already have an account? <Link href={'/login'}><a className="font-semibold text-blue-700 cursor-pointer">Login</a></Link>
                </div>
            </div>
            <ToastContainer theme="colored" />
          </div>
        )
  }
  