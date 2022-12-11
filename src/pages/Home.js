import React, { useEffect, useState } from 'react';
import AddressCard from './AddressCard';
import { toast } from 'react-toastify';
import './Home.css';
const Home = () => {
    const [addressData, setAddressData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const pages = Math.ceil(count / size);




    const getData = () => {
        fetch(`https://address-book-server-neon.vercel.app/getaddressdata?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                setCount(data?.count)
                setAddressData(data?.info)
                console.log(data);
                console.log(count);
            })
    }
    useEffect(() => {
        getData();
    }, [page, size])


    const handleSubmit = (event) => {

        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const email = from.email.value;
        const address = from.address.value;
        const city = from.city.value;
        const country = from.country.value;
        const zip = from.zip.value;

        const addData = {
            name, email, address, city, country, zip
        }

        console.log(addData);

        fetch('https://address-book-server-neon.vercel.app/addaddress', {
            method: 'POST',
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
                    toast.success('Add address successfully');
                } else {
                    toast.error('Unauthorized');
                }
                console.log(data);
            })

        setOpenModal(false);
    }


    const handleSearch = () => {

        fetch(`https://address-book-server-neon.vercel.app/addressdata?name=${searchInput}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                setAddressData(data);
                console.log(data);
            })
    }


    const handleBulk = () => {
        const addBulkData = [
            {
             
              name: "A",
              email: "a@mail.com",
                address: "home:123, block:D",
              city: "Rajshahi",
              country: "Bangladesh",
              zip: "6000"
            },
            {
             
                name: "B",
                email: "b@mail.com",
                  address: "home:123, block:D",
                city: "Rajshahi",
                country: "Bangladesh",
                zip: "6000"
            }
        ]

        fetch('https://address-book-server-neon.vercel.app/addressbulk', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(addBulkData)
        })
            .then(res => res.json())
            .then(data => {
                    getData();
                    toast.success('Add bulk data successfully');
                
            })

        setOpenModal2(false);
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div className='flex justify-between my-10'>
                <div className='flex gap-3'>
                    <input onChange={(e) => { setSearchInput(e.target.value) }} className='input input-bordered bg-primary' type="text" placeholder='search by name' />
                    <button onClick={handleSearch} className='btn btn-primary'>Search</button>
                </div>
                <div>
                    <label onClick={() => { setOpenModal2(true) }} htmlFor="addBulkModal" className="btn btn-primary mr-2">Static bulk address</label>
                    <label onClick={() => { setOpenModal(true) }} htmlFor="addAddressModal" className="btn btn-primary">Add a new address</label>
                </div>
            </div>
            <div className='grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-6 '>
                {addressData?.length > 0 &&
                    addressData?.map(item => <AddressCard
                        key={item._id}
                        item={item}
                        getData={getData}
                    ></AddressCard>)
                }



            </div>
            <p className='text-center my-5'>Currently selected page: {page + 1} and size: {size}</p>
            <div className="pagination">

                <div className='pagination-border'>
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            className={page === number ? 'selected' : 'unselect'}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>)
                    }
                </div>
                <select onChange={event => setSize(event.target.value)}>
                    <option value="6">6</option>
                    <option value="12" selected>12</option>
                    <option value="18">18</option>
                    <option value="24">24</option>
                </select>
            </div>

            {/* modal start */}

            {openModal && <>

                <input type="checkbox" id="addAddressModal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="addAddressModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form className='card-body' onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' type="text" placeholder="enter your name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="enter your email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input name='address' type="text" placeholder="enter house number and block" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City</span>
                                </label>
                                <input name='city' type="text" placeholder="enter your city name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Country</span>
                                </label>
                                <input name='country' type="text" placeholder="enter your country name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">ZIP/Postal code</span>
                                </label>
                                <input name='zip' type="number" placeholder="enter the code" className="input input-bordered" required />
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

            {/* bulk modal */}
            {openModal2 && <>

                <input type="checkbox" id="addBulkModal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="addBulkModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <p>
                            <code>
                                [
                                &#123;

                                "name": "A",
                                "email": "a@mail.com",
                                "address": "home:123, block:D",
                                "city": "Rajshahi",
                                "country": "Bangladesh",
                                "zip": "6000"
                                &#125;,
                                &#123;

                                "name": "B",
                                "email": "b@mail.com",
                                "address": "home:123, block:D",
                                "city": "Rajshahi",
                                "country": "Bangladesh",
                                "zip": "6000"

                                &#125;

                                ]
                            </code>
                        </p>

                        <button onClick={()=>{handleBulk()}} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Home;