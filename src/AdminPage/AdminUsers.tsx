import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser ,removeUser,usersRequest,usersSuccess } from '../redux/slices/userSlice';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import { RootState } from '../redux/store';
import EditUser from './EditUser';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../api';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag

interface Order {
  _id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
}
interface Users {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  isActive : boolean;
  orders : Order[];
}

interface UsersData {
  page : number
  perPage : number,
  totalUsers : number,
  totalPages : number,
  users: Users[];
}

export default function AdminUsers() {
  
  const TABLE_HEAD = ["ID", "FirstName", "LastName", "Email", "Password", "Role","Active", "Actions","",];

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const users = state.user.users;

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  
  const showConfirmDialog = (userId: number) => {
    setConfirmDialogVisible(true);
    setSelectedUserId(userId);
    

  };
  
  const deleteUserRequest = async (id : number) => {
    try {
      const res = await api.delete(`http://localhost:5050/api/users/${id}`);
      console.log('User deleted successfully:', res.data);
      dispatch(removeUser({ userId: selectedUserId || 0 }));  
      // Optionally, you might want to update the state or perform other actions after a successful update.
    } catch (error) {
      console.error('Error deleting user:', error);
      // Optionally, handle errors or show a message to the user.
    }
  };
  
  const handleDeletedUser = async () => {
    try {
      // Assuming selectedUser contains the updated data
      await deleteUserRequest(selectedUserId!!);
      // Optionally, you might want to do something after a successful update, e.g., close the form.
      console.log(selectedUser + ' Deleted)');
    } catch (error) {
      console.error('Error Deleted user:', error);
      // Optionally, handle errors or show a message to the user.
    }
  };
  
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [open, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
 
  const openForm = ( userId: number) => {
    setIsOpen(true);
    setSelectedUserId(userId);

  };
 
  const handleGetUsers = async () => {
    dispatch(usersRequest());

    const res = await api.get('http://localhost:5050/api/users');
    console.log(res.data);
    dispatch(usersSuccess(res.data.users));
  }

  useEffect(() => {
    handleGetUsers();
  }, []);
  
  

  const handleSubmit = () => {
    // Move the form submission logic here.
    // You can access selectedUser and dispatch here.
      closeForm();
    
  };

  const closeForm = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

 




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
                        <th
                          key={index}
                          scope="col"
                          className={`px-2 py-7 `}
                        >
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
                            ? "border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
                            : "border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        }
                      >
                              
                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                          {user._id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{user.first_name}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.last_name}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.password}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.role}</td>
                        <td className="whitespace-nowrap px-4 py-3">{user.isActive.toString()}</td>


                        <td
                          className="whitespace-nowrap px-4 py-3 cursor-pointer hover:text-[#530296]"
                          onClick={() => openForm(user._id)}
                          
                        >
                          Edit
                        </td>
                        <td >
                        <ConfirmDialog
        visible={confirmDialogVisible}
        onHide={() => {
          setSelectedUserId(null); // Reset selectedUserId when the dialog is hidden
          setConfirmDialogVisible(false);
        }}
        message="Are you sure you want to Delete this user?"
        header="Confirmation" 
        headerClassName='font-bold'
        
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-primary  bg-green-900 ml-4 mt-8 pl-10 pr-10"
        rejectClassName="p-button-secondary  bg-red-900 pl-10 pr-10"
        accept={handleDeletedUser}
        className='bg-[#3d3d3d] p-10 rounded'

      />
                      <span
                      
                      className="whitespace-nowrap px-1 py-3 text-red-700 hover:text-red-300 cursor-pointer pr-10"
                       onClick={()=>showConfirmDialog(user._id)}
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
       { open &&  <EditUser
            selectedIDUser={selectedUserId}
            handleSubmit={handleSubmit}
            handleClose={closeForm}
          />}
        </div>
        <div>
  
     
    </div>
      </div>
    </div>
  );
}
