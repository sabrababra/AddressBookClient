import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
    const navigate=useNavigate();
    const handleLogin=(event)=>{
        event.preventDefault();
        const from = event.target;
        const email = from.email.value;
        const pass = from.password.value;

        fetch('https://address-book-server-neon.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify({email,pass})
    })
        .then(res => res.json())
        .then(fData => {
            if (fData?.accessToken) {
                console.log('token', fData);
                localStorage.setItem('token', fData.accessToken);
                toast.success('Login Success')
                navigate('/home');
            }else{
                toast.error('Wrong email and password');
            }
        })
    }



return (

    <div className="flex items-center justify-center min-h-screen bg-base-200 w-full">
        <div className=" flex-col gap-4 ">
            <div className="text-center my-4">
                <h1 className="text-5xl font-bold ">Login now!</h1>

            </div>
            <div className="card  w-96 shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text" >Email</span>
                        </label>
                        <input name='email' type="email" placeholder="enter email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder=" enter password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
};

export default Login;