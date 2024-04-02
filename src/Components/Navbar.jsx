import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log("Successfully Log out!"))
            .catch(err => console.error(err))
    }


    const links = <>
        <li><NavLink to='/'>Home</NavLink> </li>

        {user ? <>
            <li><NavLink to='/orders'>Orders </NavLink> </li>
            <li><NavLink to='/profile'>Profile </NavLink> </li>
            <li><NavLink to='/settings'>Settings </NavLink> </li>
        </>
            : <>
                <li><NavLink to='/login'>Login </NavLink> </li>
                <li><NavLink to='/register'>Register </NavLink> </li>
            </>}
    </>

    return (
        <>
            <div className="navbar bg-base-100 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">React-Firebase</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <>
                        <span>{user.email}</span>
                        <a onClick={handleLogOut} className="btn btn-sm ml-3">Sign Out</a>
                    </>
                        :
                        <Link to='/login'> <button className="btn btn-sm ml-3">Log In</button></Link>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;