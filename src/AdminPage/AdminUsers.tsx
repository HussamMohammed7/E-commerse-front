import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser ,removeUser,usersRequest,usersSuccess } from '../redux/slices/userSlice';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import { RootState } from '../redux/store';
import EditUser from './EditUser';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../api';


interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export default function AdminUsers() {
  const TABLE_HEAD = ["ID", "FirstName", "LastName", "Email", "Password", "Role", "Actions",""];

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const user = state.user;

  const [open, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  const openForm = (user: Users) => {
    setIsOpen(true);
    setSelectedUser(user);
  };
 
  const handleGetProducts = async () => {
    dispatch(usersRequest());

    const res = await api.get('/mock/e-commerce/users.json');
    dispatch(usersSuccess(res.data));
  }

  useEffect(() => {
    handleGetProducts();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    // Move the form submission logic here.
    // You can access selectedUser and dispatch here.
    if (selectedUser) {
      dispatch(updateUser({ userId: selectedUser.id, updatedUser: selectedUser }));
      closeForm();
    }
  };

  const closeForm = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  
  const style = { color: "red" , }


  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col mt-20 h-full w-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="sm:rounded-lg">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-4 py-2"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {user.users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={
                          index % 2 === 0
                            ? "border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
                            : "border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        }
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                          {user.id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{user.firstName}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.lastName}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.password}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.role}</td>
                        <td
                          className="whitespace-nowrap px-4 py-3 cursor-pointer hover:text-[#530296]"
                          onClick={() => openForm(user)}
                        >
                          Edit
                        </td>
                        <td >
                      <span
                      className="whitespace-nowrap px-4 py-3 text-red-700 hover:text-red-300 cursor-pointer"
                       onClick={() => dispatch(removeUser({ userId: user.id }))}
                      >
                       <AiOutlineClose  />
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
          <EditUser
            selectedUser={selectedUser}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleClose={closeForm}
          />
        </div>
      </div>
    </div>
  );
}
