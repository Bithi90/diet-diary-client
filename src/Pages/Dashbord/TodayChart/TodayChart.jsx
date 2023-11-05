/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TodayChart = () => {

    const [food, setFood] = useState([]);

    useEffect(() => {
        fetch('https://diet-diary-server.vercel.app/addFood')
            .then(res => res.json())
            .then(data => setFood(data));
    }, [])
    return (  
        <div>
            <h2>today : {food.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-lime-600 text-white">
                            <th className="text-lg ps-20 ">#</th>
                            <th className="text-lg ps-20 ">Food Name</th>
                            <th className="text-lg ps-20 ">Calories</th>
                            <th className="text-lg ps-20 ">Day</th>
                            <th className="text-lg ps-20 ">Date</th>
                            <th className="text-lg ps-20 ">Add Food</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             food.map((item , index) => <tr
                             key={item._id}
                             item={item}
                             index={index}
                             >
                            <th className="text-xl ps-20 ">{index}</th>
                            <td className="text-xl ps-20 ">{item.Name}</td>
                            <td className="text-xl ps-20 ">{item.Calories}</td>
                            <td className="text-xl ps-20 ">{item.Day}</td>
                            <td className="text-xl ps-8 ">{item.Date}</td>
                            <td className="text-4xl font-bold text-lime-600 ps-20 "><Link to='/dashboard/addFood'>+</Link></td>
                        </tr>) 
                        }
                        
                         
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodayChart;