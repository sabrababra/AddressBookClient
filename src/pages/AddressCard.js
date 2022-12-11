import React, { useState } from 'react';
import { toast } from 'react-toastify';
const AddressCard = ({ item, getData }) => {
    const { name, email, address, city, country, zip, _id } = item;
    const [openModal, setOpenModal] = useState(false);


    const handleSubmit = (event ) => {
        event.preventDefault();
        const from = event.target;
        const name1 = from.name.value;
        const email1 = from.email.value;
        const address1 = from.address.value;
        const city1 = from.city.value;
        const country1 = from.country.value;
        const zip1 = from.zip.value;

        const addData = {
            name:name1,
             email:email1, 
             address:address1,
              city:city1, 
              country:country1, 
              zip:zip1
        }

        console.log(addData);

        fetch(`https://address-book-server-neon.vercel.app/updateaddress/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(addData)
        })
            .then(res => res.json())
            .then(data => {

                if (data?.acknowledged) {
                    getData();
                    toast.success('Update address successfully');
                } else {
                    toast.error('Unauthorized');
                }
                console.log(data);
            })

        setOpenModal(false);
    }
    
    const handleDelete=()=>{
        fetch(`https://address-book-server-neon.vercel.app/deleteaddress/${_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {

                if (data?.acknowledged) {
                    getData();
                    toast.success('Delete address successfully');
                } else {
                    toast.error('Unauthorized');
                }
                console.log(data);
            })
    }

    return (
        <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <div className='my-4 text-left'>
                    <p>Email: {email}</p>
                    <p>House: {address}</p>
                    <p>City: {city}</p>
                    <p>Country: {country}</p>
                    <p>ZIP/Postal code: {zip}</p>
                </div>
                <div className="card-actions justify-end">
                    <label onClick={() => { setOpenModal(true) }} htmlFor={`updatemodal_${_id}`} className="btn btn-primary">Update</label>
                    <button onClick={()=>{handleDelete(_id)}} className="btn btn-error">Delete</button>

                </div>
            </div>

            {/* modal start */}

            {openModal && <>

                <input type="checkbox" id={`updatemodal_${_id}`} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor={`updatemodal_${_id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form className='card-body' onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input defaultValue={name} name='name' type="text" placeholder="enter your name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input defaultValue={email} name='email' type="email" placeholder="enter your email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input defaultValue={address} name='address' type="text" placeholder="enter house number and block" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City</span>
                                </label>
                                <input defaultValue={city} name='city' type="text" placeholder="enter your city name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Country</span>
                                </label>
                                <input defaultValue={country} name='country' type="text" placeholder="enter your country name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">ZIP/Postal code</span>
                                </label>
                                <input defaultValue={zip} name='zip' type="number" placeholder="enter the code" className="input input-bordered" required />
                            </div>


                            <div className="form-control mt-6">

                                <button className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>}

        </div>
    );
};

export default AddressCard;