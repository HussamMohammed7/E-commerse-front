import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateUser,
  removeUser,
  usersRequest,
  usersSuccess,
  deleteUserThunk
} from '../redux/slices/userSlice'
import AdminSideBar from './AdminSideBar'
import axios from 'axios'
import { AppDispatch, RootState } from '../redux/store'
import EditUser from './EditUser'
import { AiOutlineClose } from 'react-icons/ai'
import api from '../api'
import { ConfirmDialog } from 'primereact/confirmdialog' // To use <ConfirmDialog> tag
import { User } from '../redux/slices/userSlice'

export default function AdminUsers() {
  const TABLE_HEAD = ['ID', 'FirstName', 'LastName', 'Email', 'Role', 'Active', 'Actions', '']

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.user.users

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

  const showConfirmDialog = (user_Id: string) => {
    setConfirmDialogVisible(true)
    setSelectedUserId(user_Id)
  }

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const [open, setIsOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const openForm = (userId: string) => {
    setIsOpen(true)
    setSelectedUserId(userId)
  }

  const handleGetUsers = async () => {
    dispatch(usersRequest())

    const res = await api.get('/api/users')
    console.log(res.data)
    dispatch(usersSuccess(res.data.users))
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  const handleSubmit = () => {
    // Move the form submission logic here.
    // You can access selectedUser and dispatch here.
    closeForm()
  }

  const closeForm = () => {
    setIsOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUsers = (id: string) => {
    dispatch(deleteUserThunk(id))
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col mt-20 h-full w-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="sm:rounded-lg">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th key={index} scope="col" className={`px-2 py-7 `}>
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className={
                          index % 2 === 0
                            ? 'border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600'
                            : 'border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700'
                        }>
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{user._id}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.first_name}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.last_name}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.role}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.isActive.toString()}</td>

                        <td
                          className="whitespace-nowrap px-4 py-3 cursor-pointer hover:text-[#530296]"
                          onClick={() => openForm(user._id)}>
                          Edit
                        </td>
                        <td>
                          <ConfirmDialog
                            visible={confirmDialogVisible}
                            onHide={() => {
                              setSelectedUserId(null) // Reset selectedUserId when the dialog is hidden
                              setConfirmDialogVisible(false)
                            }}
                            message={`Are you sure you want to Delete this user?   ${selectedUserId}`}
                            header="Confirmation"
                            headerClassName="font-bold"
                            acceptLabel="Yes"
                            rejectLabel="No"
                            acceptClassName="p-button-primary  bg-green-900 ml-4 mt-8 pl-10 pr-10"
                            rejectClassName="p-button-secondary  bg-red-900 pl-10 pr-10"
                            accept={() => handleDeleteUsers(selectedUserId!!)}
                            className="bg-[#3d3d3d] p-10 rounded"
                          />
                          <span
                            className="whitespace-nowrap px-1 py-3 text-red-700 hover:text-red-300 cursor-pointer pr-10"
                            onClick={() => showConfirmDialog(user._id)}>
                            <AiOutlineClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          {open && (
            <EditUser
              selectedIDUser={selectedUserId}
              handleSubmit={handleSubmit}
              handleClose={closeForm}
            />
          )}
        </div>
        <div></div>
      </div>
    </div>
  )
}
