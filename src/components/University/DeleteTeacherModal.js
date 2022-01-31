import React from 'react'

const DeleteTeacherModal = ({ teacher }) => {
    return (
        <div>
            Are you sure you want to remove {teacher.fullName} from University ?
        </div>
    )
}

export default DeleteTeacherModal
