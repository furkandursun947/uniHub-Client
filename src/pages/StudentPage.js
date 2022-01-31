import React, { useEffect, useState } from 'react'
import Info from '../components/Profile/Info'
import { useParams } from 'react-router';
import axios from '../utils/apiCall';
import { useSelector } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';

const StudentPage = () => { 
    const { studentId } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const refresh = useSelector(getRefresh);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get(`/students/${studentId}`)
            .then((res) => {
                setUserInfo(res.data);
            })
            .finally(() => setLoading(false))
    }, [studentId, refresh])
    
    
    return (
        <div style={{display: 'flex',alignItems: 'center', justifyContent:'center', maxHeight:'200px', maxWidth: '400px', margin:'auto'}}>
            <Info user={userInfo} isOwner={false} type={'Student'}/>
        </div>
    )
}

export default StudentPage