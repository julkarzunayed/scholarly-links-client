import React from 'react';
import { NavLink, Outlet } from 'react-router';
import NavBar from '../../pages/HomePage/shared/NavBar/NavBar';
import useAuth from '../../hooks/useAuth';
import Footer from '../../pages/HomePage/shared/Footer/Footer';

const RootLayout = () => {
    const { user } = useAuth();
    return (
        <div className='max-w-7xl mx-auto px-2'>
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <NavBar></NavBar>
                    <Outlet></Outlet>
                    <Footer></Footer>
                    {/* <label htmlFor="my-drawer-4" className="border">
                        <TfiMenu />
                    </label> */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}

                        <li>
                            <NavLink 
                            to={'/dashboard/myProfile'}
                            >
                                <div
                                    title={user?.displayName}
                                    className="border-[1px] border-blue-300 rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${user?.photoURL})`,
                                    }}>

                                </div>
                                <h3 className="font-semibold text-lg">
                                    {user?.displayName}
                                </h3>
                            </NavLink>
                        </li>
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/allScholarship'}>All Scholarships</NavLink></li>
                        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                        <li><NavLink to={'/about'}>About</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RootLayout;