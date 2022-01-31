import React, { useState } from 'react'
import './styles/LoginRegister.css';
import { useHistory } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { Radio, Space } from 'antd';
import { Alert } from 'antd';

import axios from '../utils/apiCall';
import { useDispatch } from 'react-redux';
import { login } from '../../src/features/userSlice'



const RegisterPage = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [type, setType] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [alertShow, setAlertShow] = useState(false);
    const dispatch = useDispatch();


    const userRegister = () => {

        if (email.length === 0 || password.length === 0 || confirmedPassword.length === 0 || fullName.length === 0 || !type) {
            setFormValid(false);
            setErrorMessage("Tüm alanları eksiksiz doldurunuz.");
            return;
        }
        else if (password.length < 8 || confirmedPassword.length < 8) {
            setFormValid(false);
            setErrorMessage("Şifre 8 karakter ve üzeri olmalıdır.")
            return;
        }
        else if (password != confirmedPassword) {
            setFormValid(false);
            setErrorMessage("Şifreleriniz eşleşmiyor.")
            return;
        }
        else {
            if (type === 1) {
                axios.post(`/students`, { fullName: fullName, email: email, password: password })
                    .then((res) => {
                        if (res.status === 201) {
                            setFormValid(true);
                            setErrorMessage("");
                            setAlertShow(true);
                            setTimeout(() => {
                                history.push('/login');
                            }, 3000)
                        }
                        else {
                            setFormValid(false);
                            setErrorMessage("Bir sorun oluştu, alanları kontrol ediniz.")
                            return;
                        }
                    })
            }
            else {
                axios.post(`/teachers`, { fullName: fullName, email: email, password: password })
                    .then((res) => {
                        if (res.status === 201) {
                            setFormValid(true);
                            setErrorMessage("");
                            setAlertShow(true);
                            setTimeout(() => {
                                history.push('/login');
                            }, 3000)
                        }
                        else {
                            setFormValid(false);
                            setErrorMessage("Bir sorun oluştu, alanları kontrol ediniz.")
                            return;
                        }
                    })
            }
        }
    }


    return (
        <div className="container-loginReg">

            <div className="row-register">
                <div style={{ display: alertShow ? 'initial' : 'none' }}>
                    <Alert
                        message="Başarılı"
                        description="Başarıyla kayıt oldunuz. Giriş sayfasına yönlendiriyorsunuz.."
                        type="success"
                        showIcon
                    />
                </div>
                <div className="header">
                    <h1 className="headerText">Register</h1>
                </div>

                <div className="radioGroupText">
                    <span className='radioFieldText'><b>Select a type</b></span>
                </div>
                <div className="radioGroup">
                    <Radio.Group onChange={e => setType(e.target.value)}>
                        <Space direction="horizantal">
                            <Radio value={1}>Student</Radio>
                            <Radio value={2}>Teacher</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <div className="inputFieldDiv">
                    <TextField id="filled-basic" label="Fullname" variant="standard" className="inputField" onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="inputFieldDiv">
                    <TextField id="filled-basic" type="email" label="E-mail" variant="standard" className="inputField" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="inputFieldDiv">
                    <TextField id="filled-basic" label="Password" type="password" variant="standard" className="inputField" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="inputFieldDiv">
                    <TextField id="filled-basic" label="Confirm Password" type="password" variant="standard" className="inputField" onChange={e => setConfirmedPassword(e.target.value)} />
                </div>

                <div className="textFieldDiv">
                    <span className="registerText">Already have an account? <b><a href='/login' style={{ color: 'red' }}>Login</a></b></span>
                </div>
                <div className="errorTextField">
                    <span className="errorText">{errorMessage}</span>
                </div>
                <div className="buttonFieldDiv">
                    <Button className="submitButton" type="submit" variant="contained" color='success' classes="submitButton" onClick={userRegister}>REGISTER</Button>
                </div>

            </div>
        </div>
    )
}


export default RegisterPage;