import { Link } from "react-router-dom";
import loginImg from '../../assets/images/login/login.svg'
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";



const SignUp = () => {
    const {createUser} = useContext(AuthContext);

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        createUser(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user)
        })
        
        .catch(error =>{
            console.error(error);  
        } )


    }
    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="hero-content flex-row">
                <div className=" mr-12 w-1/2">

                    <img src={loginImg} alt="" />
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-4xl font-bold">Sign Up</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Enter Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">

                            <input className="btn text-white font-bold  bg-orange-600" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <div className='text-center mb-2'>
                        <p className='font-medium'>Already Have  an account? <Link to='/login' className='text-red-500'>Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;