import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import signuppic from '../../assets/2878618.jpg';
import Swal from "sweetalert2";
import SocialLogin from "../Home/SocialLogin/SocialLogin";


const SignUp = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


    const password = useRef({});
    password.current = watch("password", "");


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('https://diet-diary-server.vercel.app/user', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content  flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">

                    <img className='h-[500px] w-[700px]' src={signuppic} alt="" />
                </div>
                <div className='h-[900px]'>
                    <h1 className="text-4xl text-center font-bold mb-8">Sign Up now!</h1>
                    <div className="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100 w-[900px]">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} name="photoURL" placeholder="PhotoURL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Please enter a img url</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/i
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Must have one uppercase, one lower case one number and one special character </span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm password</span>
                                </label>
                                <input type="password" {...register("confirm_password",
                                    {
                                        required: true,
                                        validate: value =>
                                            value === password.current || "The passwords do not match"

                                    })} placeholder="re-type your password" className="input input-bordered" />
                                {errors.confirm_password && <p className="text-red-600">{errors.confirm_password.message}</p>}

                            </div>
                            <div className="form-control mt-4">
                                <input className="btn bg-lime-400" type="submit" value="Sign Up" />
                            </div>
                        </form>

                        <p className='text-center mb-2'>Allready have an account? Plz <Link to='/login'>Login</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default SignUp;