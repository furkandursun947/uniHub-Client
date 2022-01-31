import React, { useEffect, useState } from 'react'
import axios from '../utils/apiCall';
import { useSelector } from 'react-redux';
import { getRefresh } from '../features/generalSlice';
import UniversitiesTab from '../components/University/UniversitiesTab';

const UniversitiesPage = () => {

    const [universities, setUniversities] = useState(null);
    const refresh = useSelector(getRefresh);

    useEffect(() => {
        axios.get('/universities')
            .then((res) => {
                setUniversities(res.data)
            })
    }, [refresh]);


    return (
        <UniversitiesTab university={universities} />
    )
}

export default UniversitiesPage; 