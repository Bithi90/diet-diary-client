import { Link } from "react-router-dom";
import banner from '../../../assets/clipboard-with-blank-sheet-sport-results.jpg';


const Banner = () => {
    return (
        <div>
            <div className='fixed-top'>
                <img className='w-full' src={banner} alt="" />
                <h2 className="font-bold text-lime-800 absolute top-[410px] text-center text-5xl left-[550px]">Be Healthy For Life!</h2>
                <h2 className="font-bold text-lime-600 absolute top-[470px] text-center text-3xl left-[550px]">Your Weight Gain, <br />Diet and Nutrition Assistance</h2>
                <Link to='/dashboard/todayChart'><button className="btn bg-lime-600 text-white font-bold absolute top-[560px] left-[700px]">Get Started</button></Link>
            </div>
        </div>
    );
};

export default Banner;