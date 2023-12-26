import React from 'react'

export default function ProfilePayment() {
  return (
    <div className="pb-10">
      <div className="text-white p-4 px-10  text-[60px] text-left">
        Payment
        <p className="text-[20px]">
        We use encrypted methods to save your card details securely</p>
        <button className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none	 bg-purple ">
          Add New Card
        </button>
        <h2 className="text-white text-[30px] mt-10">Your Cards</h2>
      </div>

      <div className="shadow-2xl w-[90%] item-center mx-auto p-10 border-[#20124d] border-t-2 border-b-2 text-left shadow-xl2 text-purple bg-[#D6D6D6]">
        <div className="mb-2 p-2 ">
          <p className="flex items-center">
            <span className="flex-grow ">type:</span>
            <span className="flex-grow">Ending in </span>
            <span className="flex-grow">Expiry:</span>
            <span className="ml-10 cursor-pointer">

              Delete card
              </span>
          </p>

        </div>
      </div>
    </div>
  )
}
