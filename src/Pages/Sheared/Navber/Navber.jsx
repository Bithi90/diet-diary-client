import { Link } from 'react-router-dom';
import logo from '../../../assets/images.jpg';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/Authprovider';

const Navber = () => {

    const { user , logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOption = <>
        <li className='font-bold '><a>Home</a></li>
        <li className='font-bold '><a>Diet Chart</a></li>
        <li className='font-bold '><a>Exercise</a></li>
        <li className='font-bold '><a>About</a></li>

        {
            user ? <><button onClick={handleLogOut} className="btn btn-active bg-orange-600 text-white  btn-xs mt-2 ">LogOut</button>
                <span className='p-2 px-2 font-semibold'>{user?.displayName}</span>
            </> :
                <>
                    <li className='text-orange-600 text-xl font-bold  '><Link to='login'>Login</Link></li>
                </>
        }
    </>
    return (

        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOption}
                    </ul>
                </div>

                <div className="flex">
                    <img className="h-[40px] w-[40px]" src={logo} alt="" />
                    <a className=" text-lime-600 pt-2 font-bold text-xl">Diet Diary</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOption}
                </ul>
            </div>
            <div className="navbar-end">
            {
                    user ? <>
                        <div className="avatar">
                            <div className="w-[65px] rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                    </> : <>
                        <Link to='/signup'><button className="btn bg-teal-600 text-white font-bold">Register</button></Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navber;