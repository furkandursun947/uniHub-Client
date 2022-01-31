import React from 'react'
import { Menu, message } from 'antd';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getIsUserLogged, logout } from '../../features/userSlice';
import { useLocation } from "react-router-dom";

const Navbar = () => {

    const isLogged = useSelector(getIsUserLogged);
    const dispatch = useDispatch();
    const History = useHistory()

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        History.push('/login');
        message.success("Başarıyla çıkış yapıldı");
    }

    return (
        <Menu mode="horizontal" className="nav-bar-for-shadow">
            <Menu.Item key="home" onClick={() => History.push('/')}>
                Home
            </Menu.Item>
            <Menu.Item key="universities" onClick={() => History.push('/universities')}>
                Universities
            </Menu.Item>
            {isLogged ? (
                <>
                    <Menu.Item key="Profile" onClick={() => History.push('/profile')}>
                        Profile
                    </Menu.Item>
                    <Menu.Item key="Logout" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
                        Logout
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="login" onClick={() => History.push('/login')} style={{ marginLeft: 'auto' }} >
                        Login
                    </Menu.Item>
                    <Menu.Item key="Register" onClick={() => History.push('/register')}>
                        Register
                    </Menu.Item>
                </>
            )}

        </Menu>
    )
}

export default Navbar