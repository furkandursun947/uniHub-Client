import React, { useState } from 'react'
import './styles/LoginRegister.css';
import { Button, TextField } from '@mui/material';
import { useHistory } from "react-router-dom";
import { message } from 'antd';
import axios from '../utils/apiCall';
import { useDispatch } from 'react-redux';
import { login } from '../../src/features/userSlice'


const LoginPage = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const userLogin = async () => {
        if (email.length === 0) {
            setFormValid(false);
            setErrorMessage("Emailinizi giriniz.");
            return;
        }
        else if (password.length === 0) {
            setFormValid(false);
            setErrorMessage("Şifrenizi giriniz.");
            return;
        }
        else {
            setErrorMessage("");
            await axios.post(`/teachers/login`, { email: email, password: password })
                .then((res) => {
                    if (res.data.error) {
                        if (res.data.error === 'User is not Assgined Yet') {
                            setFormValid(false);
                            setErrorMessage("Kullanıcı rektor tarafından onaylanmadı.");
                            return;
                        } else {
                            axios.post(`/students/login`, { email: email, password: password })
                                .then((res) => {
                                    if (res.data.length === 0) {
                                        setFormValid(false);
                                        setErrorMessage("Böyle bir kullanıcı bulunamadı.");
                                        return;
                                    }
                                    else {
                                        dispatch(login(res.data));
                                        localStorage.setItem("token", res.data.token);
                                        message.success('Başarıyla giriş yapıldı');
                                        history.push('/');
                                    }
                                }).catch((err) => {
                                    message.error("Giriş Yapılamadı.");
                                })
                        }
                    }
                    else {
                        dispatch(login(res.data));
                        localStorage.setItem("token", res.data.token);
                        message.success('Başarıyla giriş yapıldı');
                        history.push('/');
                    }
                }).catch((err) => {
                    message.error(err.data.error);
                    console.log("Bir sorun oluştu, daha sonra tekrar deneyiniz. Hata: ", err);
                })
        }
    }

    return (
        <div className="container-loginReg">
            <div className="row">
                <div className="header">
                    <h1 className="headerText">Sign in</h1>
                </div>
                <div className="inputFieldDiv">
                    <TextField required id="filled-basic" value={email} label="Email" type="email" variant="standard" className="inputField" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="inputFieldDiv">
                    <TextField required id="filled-basic" value={password} type="password" label="Password" variant="standard" className="inputField" onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="textFieldDiv">
                    <span className="registerText">Don't have an account? <b><a href='./register' style={{ color: 'red' }}>Register</a></b></span>
                </div>
                <div className="errorTextField">
                    <span className="errorText">{errorMessage}</span>
                </div>
                <div className="buttonFieldDiv">
                    <Button className="submitButton" type="submit" variant="contained" color='success' onClick={userLogin}>LOGIN</Button>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;