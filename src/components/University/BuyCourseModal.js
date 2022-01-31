import React from 'react'
import { Form, Input } from 'antd';

const BuyCourseModal = ({ course, name, setName, creditCard, setCreditCard, date, setDate, cvc, setCvc }) => {

    return (
        <div className='buy-course-modal'>
            <Form layout="vertical" onFinish={() => null} >
                <Form.Item label="Course Name">
                    <span>{course.courseName}</span>
                </Form.Item>
                <Form.Item label="Course CRN">
                    <span>{course.crn}</span>
                </Form.Item>
                <label>Name and Surname</label>
                <Input 
                    value={name}
                    onChange={(e) => {
                        if(e.target.value.length < 46){
                            setName(e.target.value)
                        }
                    }}
                />
                <hr />
                <label>Credit Card Number</label>
                <Input
                    type="number"
                    value={creditCard}
                    onChange={(e) => {
                        if(e.target.value.length < 17){
                            setCreditCard(e.target.value)
                        }
                    }}
                />
                <hr />
                <label>Credit Card Date MM-YY</label>
                <Input
                    value={date}
                    onChange={(e) => {
                        if(e.target.value.length < 6){
                            if(e.target.value.length === 2){
                                setDate(e.target.value + "-")    
                            } else {   
                                setDate(e.target.value)
                            }
                        }
                    }}
                />
                <hr />
                <label>Credit Card Date CVC</label>
                <Input
                    value={cvc}
                    type="number"
                    onChange={(e) => {
                        if(e.target.value.length < 4){
                            setCvc(e.target.value)
                        }
                    }}
                />
            </Form>
        </div>
    )
}

export default BuyCourseModal
