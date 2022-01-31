import React, { useEffect, useState } from 'react'
import Info from '../components/Profile/Info'
import { useParams } from 'react-router';
import axios from '../utils/apiCall';
import { useSelector } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';

const TeacherPage = () => { 
    const { teacherId } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const refresh = useSelector(getRefresh);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get(`/teachers/${teacherId}`)
            .then((res) => {
                setUserInfo(res.data);
            })
            .finally(() => setLoading(false))
    }, [teacherId, refresh])
    
    
    return (
        <div style={{display: 'flex',alignItems: 'center', justifyContent:'center', maxHeight:'200px', maxWidth: '400px', margin:'auto'}}>
            <Info user={userInfo} isOwner={false} type={'Teacher'}/>
        </div>
    )
}

export default TeacherPage