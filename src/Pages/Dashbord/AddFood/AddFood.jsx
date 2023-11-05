import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/Authprovider";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const AddFood = () => {


    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard/todayChart";


    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        formData.append('Image', data.Image)
        const item = { Name: data.Name, Calories: data.Calories, Day: data.day, Date: data.Date, email: user.email }
        fetch('https://diet-diary-server.vercel.app/addFood', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item) 
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.insertedId) {
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from, { replace: true });
                }
            })


    };


    return (
        <div className="w-full ml-20">
            <h2 className="flex justify-evenly font-semibold text-2xl mb-10">Add an Food</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex my-4">
                    <div className="form-control w-full me-2">
                        <label className="label">
                            <span className="label-text font-semibold">Food Name*</span>
                        </label>
                        <input type="text" placeholder="Name"
                            {...register("Name", { required: true, maxLength: 120 })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full me-2 ">
                        <label className="label">
                            <span className="label-text font-semibold">Calories*</span>
                        </label>
                        <input type="number" {...register("Calories", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control me-2">
                        <label className="label">
                            <span className="label-text">Day</span>
                        </label>
                        <input type="text" {...register("day", { required: true })} name="day" placeholder="Day" className="input input-bordered" />

                    </div>
                    <div className="form-control w-full ">  
                        <label className="label">
                            <span className="label-text font-semibold">Date*</span>
                        </label>
                        <input type="date" {...register("Date", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                </div>
                <input className="btn btn-sm bg-lime-600 text-white mt-4" type="submit" value="Add Food" />
            </form>
        </div>
    );
};

export default AddFood;