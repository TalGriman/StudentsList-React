import React, { FC } from 'react';



interface CheckBoxInputProps {
    studentID: number;
    handleSelectStudent: (id: number, isChecked: boolean) => void;
    checkedStudents: number[];
}


const CheckBoxInput: FC<CheckBoxInputProps> = (props) => {
    // props
    const { studentID, handleSelectStudent, checkedStudents } = props;


    return (
        <input className='card__checkbox' type="checkbox" checked={checkedStudents.includes(studentID)} onChange={(e) =>handleSelectStudent(studentID, e.target.checked) } />
    );
}

export default CheckBoxInput;