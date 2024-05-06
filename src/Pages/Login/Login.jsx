import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from './../../AuthProvider/AuthProvider';
import axios from 'axios';


const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;


        loginUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const user = { email };

                //get access token by axios
                axios.post('http://localhost:5000/jwt', user)
                    .then(res => {
                        console.log(res.data);
                    })


                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
            })


    }

    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="hero-content flex-row">
                <div className=" mr-12 w-1/2">

                    <img src={loginImg} alt="" />
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-4xl font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">

                            <input className="btn text-white font-bold  bg-orange-600" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className='text-center mb-2'>
                        <p className='font-medium'>Do You Have not an account? <Link to='/signUp' className='text-red-500'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;