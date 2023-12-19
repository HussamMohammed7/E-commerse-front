import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function () {
    const user = useSelector((state: RootState) => state.user.user) // Get logged-in user

  const [language, setLanguage] = React.useState<string>('english')

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value)
  }


  
  return (
    <div>
      <div className="pb-10">
        <div className="text-white p-4 px-10  text-[60px] text-left">
          Profile
          <p className="text-[20px]">
            {' '}
            Manage your details, view your tier status and change your password
          </p>
          <h2 className="text-white text-[30px] mt-10">General Info</h2>
        </div>

        <div className="shadow-2xl w-[90%] item-center mx-auto p-4 text-left shadow-xl2 text-purple bg-[#D6D6D6]">
          <div className="mb-2 p-2 ">
            <p className="flex items-center">
              <span className="flex-grow ">First Name </span>
              <span className="flex-grow">Last Name </span>
              <span className="mr-[7rem]">Languages</span>
            </p>
          </div>
          <div className="mb-2 p-2 mx-auto ">
            <input
              type="text"
              placeholder="First Name"
              value={user?.first_name}
              className=" p-4 border-2 border-[#20124d] bg-white"> 
                 </input>
            <input
              type="text"
              placeholder="Last Name"
              value={user?.last_name}
              className=" p-4 ml-20 bg-white border-2 border-[#20124d] "></input>
            <Select
              labelId="language-label"
              id="language"
              value={language}
              onChange={handleChange}
              label="Select Language"
              className="bg-white border-2 border-[#20124d] ml-[4rem] rounded-none w-[10rem] ">
              <MenuItem value="" disabled>
                Choose Language
              </MenuItem>
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="arabic">العربية (Arabic)</MenuItem>
            </Select>
          </div>
          <div className=" p-2 mt-4 ">
            <button className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none bg-purple ">
              Update Info
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-[30px] text-white text-left p-4 px-10"> Security </h2>

      <div className="shadow-2xl w-[90%] item-center mx-auto p-4 text-left shadow-xl2 text-purple bg-[#D6D6D6] mb-10">
      <div className="mb-2 p-2 flex items-center justify-between">
  <span className="text-[20px] pl-10">Email  : </span>
  
  <div className="flex items-center">
    <input
      type="text"
      value={user?.email}
      readOnly
      placeholder="Last Name"
      className="cursor-not-allowed w-[20rem] p-4 bg-gray-400 "
    />
  </div>

  <button className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none bg-purple">
    Update Email
  </button>
</div>


<div className="mb-2 p-2 flex items-center justify-between">
  <span className="text-[20px] pl-10">Password  : </span>
  
  <div className="flex items-center">
    <input
      type="text"
      value="**********"
      readOnly
      placeholder="Last Name"
      className="cursor-not-allowed w-[20rem] p-4 bg-gray-400 "
    />
  </div>

  <button className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none bg-purple">
    Update Password
  </button>
</div>
<div className="mb-2 p-2 flex items-center justify-between">
  <span className="text-[20px] pl-10">phone  : </span>
  
  <div className="flex items-center">
    <input
      type="text"
      readOnly
      value={user?.phone}
      placeholder="Last Name"
      className="cursor-not-allowed w-[20rem] p-4 bg-gray-400 "
    />
  </div>

  <button className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none bg-purple">
    Update Phone
  </button>
</div>


      </div>
    </div>
  )
}
