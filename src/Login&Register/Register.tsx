import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'

export default function Register() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberChange = (value : string) => {
      setPhoneNumber(value);
    };
  return (

    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden 
    bg-gradient-to-r from-[#20124d] to-[#0C071E] 
    mt-10">
            <div className="w-full p-6 m-auto  rounded-md shadow-md lg:max-w-xl text-left bg-[#141414] border">
                <h1 className="text-3xl font-semibold text-purple-400 mb-10 ">
                   Register
                </h1>
                <form className="mt-6">
                    <div className='flex'>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold "  >
                            First Name
                        </label>
                        <input type="text" 
                         className="block w-[16.25rem] mr-2 px-4 py-2 mt-2 text-purple-100  border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold "  >
                            Last Name
                        </label>
                        <input type="text" 
                         className="block w-[16.25rem] px-4 py-2 mt-2 text-purple-100  border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    </div>
                    <PhoneInput
                          country={'sa'} // Default country
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          inputClass="block w-full px-4 py-2 mt-2 text-purple-100  border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"

                          
                                                                    />
                    


                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold mt-2 "
                        >
                            Password
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-100  border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold "
                        >
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-100  border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                            bg-gradient-to-r from-[#20124d] to-[#0C071E] 
                            hover:bg-purpleHover rounded-md hover:bg-purple-600 focus:outline-none hover-border">
                            Register
                        </button>
                    </div>
                </form>

               
            </div>
        </div>
  )
}
