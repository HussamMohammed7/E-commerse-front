import React, { useState } from 'react'
import { COUNTRIES } from '../components/COUNTRIES'
import CountrySelector from '../components/Selector'
import { SelectMenuOption } from '../components/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { addAddressThunk, deleteAddressThunk } from '../redux/slices/userSlice'
import { ConfirmDialog } from 'primereact/confirmdialog'
interface AddAddressFormProps {
  onClose: any // Change 'any' to the specific type if known
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.user)
  const user = state.user
  const userId = state.user?._id

  const [isOpen, setIsOpen] = useState(false)
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('SA')
  // Step 1: Create state to manage form fields
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    address: '',
    phone: 0
  })

  // Step 2: Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Step 3: Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userId !== undefined) {
      const address = {
        name: formData.name,
        country: country,
        city: formData.city,
        address: formData.address,
        phone: formData.phone
      }

      dispatch(addAddressThunk({ userId, address }))

      console.log('Form data submitted:', formData)

      // Close the form
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-neutral-700 rounded shadow-md max-w-xl w-full text-left text-white">
        {/* <span
          onClick={handleClose}
          className="absolute right-[17rem] text-red-700 hover-text-red-300 cursor-pointer text-2xl top-[rem]"
        >
          <AiOutlineClose />
        </span> */}
        <h1 className="text-5xl p-7 mb-10 text-left ">Add Address</h1>

        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium text-left p-2">
            Name (first and last name ) :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium text-left p-2">
            Country
          </label>
          <CountrySelector
            id={'countries'}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={(val) => setCountry(val)}
            // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
            selectedValue={COUNTRIES.find((option) => option.value === country) as SelectMenuOption}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="City" className="block text-sm font-medium text-left p-2">
            City :
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleInputChange}
            className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Address" className="block text-sm font-medium text-left p-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Phone" className="block text-sm font-medium text-left p-2">
            Phone :
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#530296] border border-transparent rounded-md hover-bg-purpleHover focus-outline-none focus-ring-2 focus-ring-offset-2 text-sm">
          Save
        </button>
      </form>
    </div>
  )
}

const ProfileAddress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddAddressFormVisible, setIsAddAddressFormVisible] = useState(false);
  const state = useSelector((state: RootState) => state.user);
  const user = state.user;

  const [confirmDialogVisible, setConfirmDialogVisible] = useState<string | null>(null);

  // Function to toggle the visibility of AddAddressForm
  const handleAddAddressClick = () => {
    setIsAddAddressFormVisible(!isAddAddressFormVisible);
  };

  // Function to show confirm dialog for a specific address
  const showConfirmDialog = (addressId: string) => {
    setConfirmDialogVisible(addressId);
  };

  // Function to hide the confirm dialog
  const hideConfirmDialog = () => {
    setConfirmDialogVisible(null);
  };

  // Function to handle the deletion of an address
  const handleDeleteAddress = (addressId: string) => {
    if (user?._id) {
      dispatch(deleteAddressThunk({ userId: user._id, addressId }));
      hideConfirmDialog();
    }
  };

  return (
    <div className="pb-10">
      <div className="text-white p-4 px-10 text-[60px] text-left">
        Address
        <p className="text-[20px]">
          Manage your saved addresses for fast and easy checkout across our marketplaces
        </p>
        {/* Toggle the visibility of AddAddressForm */}
        <button
          className="text-white text-[20px] border-0 hover:bg-purpleHover rounded-none bg-purple"
          onClick={handleAddAddressClick}>
          Add Address
        </button>
        <h2 className="text-white text-[30px] mt-10">Your Address</h2>
      </div>

      {/* Conditional rendering of AddAddressForm based on state */}
      {isAddAddressFormVisible ? (
        <AddAddressForm onClose={() => setIsAddAddressFormVisible(false)} />
      ) : (
        <div className="">
          {user?.address.map((address, index) => (
            <div className="shadow-2xl w-[90%] item-center mx-auto p-4 text-left shadow-xl2 text-purple bg-[#D6D6D6] mb-4" key={index}>
              <div className="mb-2 p-2">
                <p className="flex items-center">
                  <span className="flex-grow">{`Name: ${address.name}`}</span>
                  <span className="ml-auto">Edit</span>
                  <span
                    className="ml-10 cursor-pointer"
                    onClick={() => showConfirmDialog(address._id)}>
                    Delete
                  </span>
                </p>
                <p className="text-purple">{`Country: ${address.address}`}</p>
                <p className="text-purple">{`City: ${address.city}`}</p>
                <p className="text-purple">{`Country: ${address.country}`}</p>
                <p className="text-purple">{`Phone: ${address.phone}`}</p>
              </div>
              <ConfirmDialog
                visible={confirmDialogVisible === address._id}
                onHide={hideConfirmDialog}
                message={`Are you sure you want to Delete this category? ${address._id}`}
                header="Confirmation"
                headerClassName="font-bold"
                acceptLabel="Yes"
                rejectLabel="No"
                acceptClassName="p-button-primary bg-green-900 ml-4 mt-8 pl-10 pr-10"
                rejectClassName="p-button-secondary bg-red-900 pl-10 pr-10"
                accept={() => handleDeleteAddress(address._id)}
                className="bg-[#3d3d3d] p-10 rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileAddress;