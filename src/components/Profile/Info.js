import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from '../../utils/apiCall';
import { getScreenSize } from '../../features/generalSlice';
import { getUser } from '../../features/userSlice';
import { Button, Grid, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileModal from '../Profile/EditProfileModal';
import { Statistic } from 'antd';

const Info = ({ user, type, changedUser, isOwner }) => {
    const [open, setOpen] = useState(false);
    const [changed, setChanged] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    const size = useSelector(getScreenSize);

    var userType = useSelector(getUser);
    userType = userType?.isStudent;

    if (changed) {
        if (type === 'Student') {
            axios.get(`/students/${user?.id}`)
                .then((res) => {
                    setUserInfo(res.data);
                    setChanged(false);
                    changedUser();
                })
        }
        else {
            axios.get(`/teachers/${user?.id}`)
                .then((res) => {
                    setUserInfo(res.data);
                    setChanged(false);
                    changedUser();
                })
        }
    }

    useEffect(() => {
        setUserInfo(user);
    }, [user])


    return (
        <Grid>
            <Grid container item xs={1.5} md={0} />
            <Grid container item xs={9} md={12} style={{ paddingBottom: 0 }}>
                <Grid item container xs={12} md={12} style={{ marginTop: '20px' }}>
                    <Statistic title="Fullname" value={userInfo?.fullName} />
                </Grid>
                <Grid item container xs={12} md={12} style={{ marginTop: '20px' }}>
                    <Statistic title="Email" value={userInfo?.email} />
                </Grid>
                <Grid item container xs={12} md={12} style={{ marginTop: '20px' }}>
                    <Statistic title="Number" formatter={(value) => value} value={type === 'Student' ? userInfo?.studentNumber : userInfo?.teacherNumber} />
                </Grid>
                {type === 'Student' && 
                    <Grid item container xs={12} md={12} style={{ marginTop: '20px' }}>
                        <Statistic title="Gpa" value={userInfo?.gpa} />
                    </Grid>
                }
            </Grid>
            {isOwner ? (
                <Grid item container justifyContent="center">
                    <Grid item container style={{ marginTop: 20, width: size < 850 ? '50%' : '100%' }} justifyContent="flex-start">
                        <Button variant="contained" size={"medium"} startIcon={<EditIcon />} fullWidth={size < 850} onClick={() => setOpen(true)}>
                            Edit Profile
                        </Button>
                    </Grid>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <EditProfileModal user={user} changed={() => setChanged(true)} closeModal={() => setOpen(false)} />
                    </Modal>
                </Grid>
            ) : ('')}
        </Grid>
    )
}


export default Info;