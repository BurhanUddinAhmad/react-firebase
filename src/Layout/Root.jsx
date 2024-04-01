import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";


const Root = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto">
                <Outlet />
            </main>
        </>
    );
};

export default Root;