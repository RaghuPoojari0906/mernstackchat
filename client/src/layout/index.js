import React from 'react';


const AuthLayout = ({children}) => {
  return (
   <>
   <header className='flex  py-3 h-15 shadow-md bg-white' >
    {/* <img className='ml-5' src={sahara}width={50 } height={10}/> */}
    <h1 className='font-semibold ml-5 text-lg'>SAHARA</h1>
   </header>
   {children}
   </>
  )
}

export default AuthLayout;