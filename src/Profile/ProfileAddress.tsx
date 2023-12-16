import React from 'react'



export default function ProfileAddress() {
  return (
    <div className='pb-10'>
      <div className="text-white p-4 px-10  text-[60px] text-left">
        Address
        <p className='text-[20px]'> Manage your saved addresses for fast and easy checkout across our marketplaces</p>
        <button className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none	 bg-purple ">Add Address</button>
        <h2 className="text-white text-[30px] mt-10">Your Address</h2>

        </div>

      <div className="shadow-2xl w-[90%] item-center mx-auto p-4 text-left shadow-xl2 text-purple bg-[#D6D6D6]">
        

        <div className="mb-2 p-2 ">
        <p className="flex items-center">
  <span className="flex-grow ">Name:</span>
  <span className="ml-auto">Edit</span>
  <span className="ml-10">Delete</span>

  
</p>
          

        </div>
        <div className="mb-2 p-2 ">
          <p className="text-purple">Address: 123 Main Street, City, Country</p>
        </div>
        <div className=' mb-2 p-2 '>
          <p className="text-purple ">Phone: +1 123-456-7890</p>
        </div>
      </div>
      
    
    </div>
  )
}
