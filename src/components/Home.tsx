import React from 'react'

export default function Home() {
  return (
    <div>
      <img
        alt="nature"
        className="h-[38rem] w-[100rem] mt-[3rem] "
        src="https://www.bonelk.com/cdn/shop/collections/Flat_Cables_Product_banner_e1355074-5063-498a-9e4f-f0185121c33f.png?v=1665374841&width=2400"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold">Cable master</h1>
        <p className="text-xl">More than just cables</p>
      </div>

      <h1 className="p-[4rem] text-left">Top product</h1>
    </div>
  )
}
