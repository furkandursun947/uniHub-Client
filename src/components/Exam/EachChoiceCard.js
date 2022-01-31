import { Col } from 'antd';
import React from 'react'

const EachChoiceCard = ({ choiceNumber, choice, index, isSelected, setSelected }) => {


    const handleClick = () => {
        setSelected(index)
    }

    return (
        <Col xs={24} md={11} onClick={handleClick}
            style={{ 
                paddingBottom: 10, paddingTop: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 7, cursor: 'pointer', textTransform: 'capitalize', fontWeight: 700,
                border: isSelected ? "2px solid transparent":"2px solid #217696",
                color: isSelected ? "1d821d":"217696",
                backgroundColor: isSelected ? "#1d821d":"rgba(0,0,0,0.03)"
            }}
        >
            {choiceNumber}) {choice}
        </Col>
    )
}

export default EachChoiceCard
