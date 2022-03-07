import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../Common/Interfaces';
import CheckBoxInput from './CheckBoxInput';


interface CardProps {
    key: number;
    student: Student;
    isCheckedboxVisible: boolean;
    checkedStudents: number[];
    handleSelectStudent: (id: number, isChecked: boolean) => void;
}

const Card: FC<CardProps> = (props) => {
    // props
    const { student, handleSelectStudent, checkedStudents, isCheckedboxVisible } = props;

    // navigation
    const navigate = useNavigate();

    return (
        <div className='card'>
            {
                !student.Image.includes("data:") ?
                <img className='card__img' src={require(`../assets/${student.Image}`)} />
                :
                <img className='card__img_data' src={student.Image} />
            }
            <div className={`card__checkbox_wrapper ${!isCheckedboxVisible && 'card__checkbox_wrapper_disabled'}`}>
                <CheckBoxInput studentID={student.ID} handleSelectStudent={handleSelectStudent} checkedStudents={checkedStudents} />
            </div>
            <div className='card__body'>
                <h2 className='card__title'>{student.Name}</h2>
                <p className='card__description'>Age: {student.Age}</p>
                <p className='card__description'>Gender: {student.Gender}</p>
                <p className='card__description'>School: {student.School}</p>
                <p className='card__description'>City: {student.City}</p>

                <button className='card__btn' onClick={() => navigate(`/student/${student.ID}`)}>Watch profile</button>
            </div>
        </div>
    );
}

export default Card;