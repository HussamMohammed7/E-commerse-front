import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import api from '../api'
import { useDispatch } from 'react-redux'
import { getUserOneThunk, updateUser } from '../redux/slices/userSlice'
import { User } from '../redux/slices/userSlice'
import { AppDispatch } from '../redux/store'

type Role = 'visitor' | 'admin'




interface EditUserProps {
  selectedIDUser: string | null
  handleSubmit: () => void
  handleClose: () => void
}

const EditUser: React.FC<EditUserProps> = ({ selectedIDUser, handleSubmit, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [name]: value
      })
    }
  }
  const handleSelectActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const booleanValue = value === 'true' || value === 'false' ? value : (value === 'true') ? false : true



    setSelectedUser({
      ...selectedUser!,
      [name]: booleanValue,
    });
    console.log(selectedUser?.isActive)
  };
  
  
  // ...
  
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setSelectedUser({
      ...selectedUser!,
      [name]: value,
    });
    console.log(selectedUser?.role)

  };
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  console.log(selectedIDUser)
  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const res = await api.get(`/api/users/${selectedIDUser}`)
        setSelectedUser(res.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (selectedIDUser) {
      handleGetUser()
    }
  }, [selectedIDUser])
  

  


  const updateUserRequest = async (id: string, user: User) => {
    try {
      const res = await api.put(`/api/users/${id}`, user)
      console.log('User updated successfully:', res.data)
      dispatch(updateUser({ userId: id, updatedUser: res.data.user }))

      // Optionally, you might want to update the state or perform other actions after a successful update.
    } catch (error) {
      console.error('Error updating user:', error)
      // Optionally, handle errors or show a message to the user.
    }
  }

  const handleUpdateUser = async () => {
    try {
      // Assuming selectedUser contains the updated data
      await updateUserRequest(selectedIDUser!!, selectedUser!!)
      // Optionally, you might want to do something after a successful update, e.g., close the form.
      console.log(selectedUser + ' updated)')
      handleClose()
    } catch (error) {
      console.error('Error updating user:', error)
      // Optionally, handle errors or show a message to the user.
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  // const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // const validateForm = () => {
  //   const errors: Record<string, string> = {};

  //   if (!selectedIDUser) {
  //     return false;
  //   }

  //   if (!selectedUser.first_name) {
  //     errors.firstName = 'First Name is required';
  //   }

  //   if (!selectedUser.last_name) {
  //     errors.lastName = 'Last Name is required';
  //   }

  //   if (!selectedUser.email) {
  //     errors.email = 'Email is required';
  //   } else if (!selectedUser.email.includes('@')) {
  //     errors.email = 'Invalid email format';
  //   }

  //   if (!selectedUser.password) {
  //     errors.password = 'Password is required';
  //   }

  //   setValidationErrors(errors);

  //   return Object.keys(errors).length === 0;
  // };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const submitForm = () => {
    handleSubmit()
    handleClose()
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
        selectedUser ? '' : 'hidden'
      }`}>
      <div className="bg-white dark:bg-neutral-700 p-4 rounded shadow-md max-w-md w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}>
          <div className="mb-4">
            <span
              onClick={handleClose}
              className=" absolute  right-[35rem] text-red-700 hover:text-red-300 cursor-pointer">
              <AiOutlineClose />
            </span>
            <label htmlFor="first_name" className="block text text-sm font-medium text-left p-2">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={selectedUser?.first_name || ''}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-left p-2">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={selectedUser?.last_name || ''}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

        
          <div className="mb-4">
            <label htmlFor="isActive" className="block text-sm font-medium text-left p-2">
              isActive
            </label>
            <div className="relative">
              <select
                id="isActive"
                name="isActive"
                value={selectedUser?.isActive.toString()}
                onChange={handleSelectActive}
                className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option
                  className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value="true">
                  isActive
                </option>
                <option value="false"> notActive</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-left p-2">
              Role
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={selectedUser?.role}
                onChange={handleSelect}
                className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option
                  className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value="admin">
                  Admin
                </option>
                <option value="visitor">Visitor</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#530296] border border-transparent rounded-md hover:bg-purpleHover focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={handleUpdateUser}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
