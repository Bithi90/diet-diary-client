import { Outlet } from "react-router-dom";
import Navber from "../Pages/Sheared/Navber/Navber";


const Main = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;