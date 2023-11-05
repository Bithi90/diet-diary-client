import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { VscDebugContinue } from 'react-icons/vsc';
import { BiSelectMultiple } from 'react-icons/bi';


const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-lime-700  text-white font-semibold">
                    {/* Sidebar content here */}
                    {<>
                        <li>
                            <div className='grid justify-items-center border-b-4 border-orange-500'>
                                <p className='text-orange-500 text-xl font-bold mb-2'>Diet Diary</p>
                            </div>
                        </li>

                        <li><NavLink to='/'><FaHome></FaHome> User Home</NavLink></li>
                        <li>
                            <NavLink to='/dashboard/todayChart'><BiSelectMultiple></BiSelectMultiple> Today <div></div></NavLink></li>
                        <li><NavLink to='/dashboard/addFood'><VscDebugContinue></VscDebugContinue> Add Food </NavLink></li>    
                        <li className="border-t-4 border-orange-500 mt-10"><NavLink to='/'><FaHome></FaHome> Home </NavLink></li>
                        

                    </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;