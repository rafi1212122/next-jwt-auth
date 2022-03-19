import { Menu } from '@headlessui/react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { LogoutIcon, MenuIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const logoutHandler = () => {
    router.push('/api/auth/clearcookies')
  }

  return (
    <>
    {(router.pathname!='/login'&&router.pathname!='/register')?<><div className='bg-white shadow-md h-12 md:block hidden'> <div className='flex items-center h-full w-full justify-between container mx-auto'> <div className='h-full text-xl p-2 font-semibold'> Home </div> <a className='h-full cursor-pointer flex text-xl p-2 font-semibold' onClick={logoutHandler}> <LogoutIcon className='h-full mr-2 p-0.5 fill-gray-500'/> Logout </a> </div> </div> <div className='bg-white shadow-md h-10 md:hidden items-end'> <div className='flex items-center h-full w-full justify-between'> <div className='h-full p-2 font-semibold'> Home </div> <Menu as={'div'} className='relative h-full inline-block text-left'> <Menu.Button className="text-black bg-white h-full w-full"> <MenuIcon className='h-full w-full p-2' /> </Menu.Button> <Menu.Items className='bg-white rounded-md shadow-lg absolute right-0'> <div className='p-1 m-1'> <Menu.Item as={'div'}> <button onClick={logoutHandler} className='text-sm flex'> <LogoutIcon aria-hidden='true' className='w-5 h-5 mr-2' /> Logout </button> </Menu.Item> </div> </Menu.Items> </Menu> </div> </div></>:''}
    <div className='container mx-auto'>
      <Component {...pageProps} />
    </div>
    </>
  )
}

export default MyApp
