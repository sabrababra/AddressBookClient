import React from 'react';

const addBook = () => {
    return (
        <div>
      <h1 className='text-center text-4xl font-semibold mt-1'><span>Welcome to the</span><span className=' text-primary'> Address Book</span></h1>
      <div className=" w-10/12 mx-auto min-h-screen bg-base-200">
  <div className="  flex-col lg:flex-row-reverse">
    
    <div className=" card w-full  shadow-2xl bg-base-100">
      <form className='card-body'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="enter your name" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="enter your email" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input type="text" placeholder="enter house number and block" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input type="text" placeholder="enter your city name" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input type="text" placeholder="enter your country name" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">ZIP/Postal code</span>
          </label>
          <input type="number" placeholder="enter the code" className="input input-bordered" />
        </div>

        
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
    );
};

export default addBook;