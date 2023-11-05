import Swal from "sweetalert2";
import loginpic from '../../assets/2878618.jpg';
import { useContext } from "react";
import { AuthContext } from "../../Provider/Authprovider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Home/SocialLogin/SocialLogin";


const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Login successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">

                    <img className='h-[450px] w-[700px]' src={loginpic} alt="" />
                </div>
                <div>
                    <h1 className="text-4xl text-center font-bold mb-2">Login now!</h1>
                    <div className="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100 h-[490px] w-[900px]">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-lime-400">Login</button>
                            </div>
                        </form>
                        <p className='text-center mb-2'>New Here? <Link to='/signUp'>Create a New Account</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;