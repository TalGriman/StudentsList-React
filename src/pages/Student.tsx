import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddressBookIcon from '../assets/Svg/AddressBookIcon';
import BirthdayCakeIcon from '../assets/Svg/BirthdayCakeIcon';
import CameraIcon from '../assets/Svg/CameraIcon';
import { GraduationHatIconV1 } from '../assets/Svg/GraduationHatIcon';
import MetroLocatinIcon from '../assets/Svg/MetroLocatinIcon';
import TransgenderIcon from '../assets/Svg/TransgenderIcon';
import { Student as student } from '../Common/Interfaces';
import Details from '../components/Details';
import TextInput from '../components/TextInput';

const Student: FC = (props) => {
    // navigation
    const navigate = useNavigate();
    const location = useLocation();
    // states
    const [students, setStudents] = useState<student[]>([]);
    const [currentStudent, setCurrentStudent] = useState<student>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // state for edit mode
    const [name, setName] = useState<string>();
    const [age, setAge] = useState<string>();
    const [gender, setGender] = useState<string>();
    const [school, setSchool] = useState<string>();
    const [city, setCity] = useState<string>();
    const [image, setImage] = useState<string>();

    const [errorNameMessage, setErrorNameMessage] = useState<string>("");
    const [errorAgeMessage, setErrorAgeMessage] = useState<string>("");
    const [errorGenderMessage, setErrorGenderMessage] = useState<string>("");
    const [errorSchoolMessage, setErrorSchoolMessage] = useState<string>("");
    const [errorCityMessage, setErrorCityMessage] = useState<string>("");


    useEffect(() => {
        const storageData = sessionStorage.getItem("students"); // get the students from session storage
        if (storageData === null) { // check if in session storage there is data
            navigate("/");
            return;
        }
        const studentID = parseInt(location.pathname.split("/")[2]); // get student id from browser path
        const data: student[] = JSON.parse(storageData);
        const cStudent = data.find((s) => s.ID === studentID); // get the current user
        if (!cStudent) { // if not current user go back home
            navigate("/");
            return;
        }
        setStudents(data);
        setCurrentStudent(cStudent);

    }, [location.pathname, navigate]);

    const handleActiveEditMode = () => {
        setName(currentStudent?.Name);
        setAge(currentStudent?.Age.toString());
        setCity(currentStudent?.City);
        setSchool(currentStudent?.School);
        setGender(currentStudent?.Gender);
        setImage(currentStudent?.Image);
        setIsEditMode(true);
    };

    const onFieldChange = async (identifier: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const ageRgx = /^[0-9]*$/;
        const txt = e.target.value;
        if (identifier === "age" && ageRgx.test(txt)) {

            setAge(txt);
        }
        else if (identifier === "gender") {
            setGender(txt);
        }
        else if (identifier === "school") {
            setSchool(txt);
        }
        else if (identifier === "city") {
            setCity(txt);
        }
        else if (identifier === "name") {
            setName(txt);
        }
        else if (identifier === "image") {
            if (!e.target.files) return;

            const base64 = await toBase64(e.target.files[0]) as string;
            setImage(base64);

        }
    };

    const toBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSaveChanges = () => {
        if (checkFields() < 5) {
            return;
        }
        const updatedDetails: student = {
            ID: currentStudent?.ID || 0,
            Age: parseInt(age ? age : "0"),
            City: city || "",
            Gender: gender || "",
            Name: name || "",
            School: school || "",
            Image: image || currentStudent?.Image || ""
        }

        const tempStudents = [...students];
        const index = tempStudents.findIndex((stu) => stu.ID === updatedDetails.ID); // find the current student
        tempStudents[index] = updatedDetails; // replace with new data
        // save the new data in states and session storage
        sessionStorage.setItem("students", JSON.stringify(tempStudents));
        setCurrentStudent(updatedDetails);
        setStudents(tempStudents);
        clearEditstates();

    };

    const clearEditstates = () => {

        setIsEditMode(false);
        setName(undefined);
        setAge(undefined);
        setGender(undefined);
        setSchool(undefined);
        setCity(undefined);
        setImage(undefined);
        setErrorAgeMessage("");
        setErrorCityMessage("");
        setErrorNameMessage("");
        setErrorGenderMessage("");
        setErrorSchoolMessage("")

    };

    // fields validations
    const checkFields = () => {
        let counter = 0;
        if (!age || age === "") {
            setErrorAgeMessage("Age must to be number and can't to be empty!");
        } else {
            setErrorAgeMessage("");
            counter++;
        }

        if (!gender || !(gender.toUpperCase() === "MALE" || gender.toUpperCase() === "FEMALE") || gender === "") {
            setErrorGenderMessage("Gender must to be 'Male' or 'Female' and can't to be empty!");
        } else {
            setErrorGenderMessage("");
            counter++;
        }

        if (!school || school === "") {
            setErrorSchoolMessage("School can't to be empty!");
        } else {
            setErrorSchoolMessage("");
            counter++;
        }

        if (!city || city === "") {
            setErrorCityMessage("City can't to be empty!");

        } else {
            setErrorCityMessage("");
            counter++;
        }

        if (!name || name === "") {
            setErrorNameMessage("Name can't to be empty!");
        } else {
            setErrorNameMessage("");
            counter++;
        }

        return counter;
    };



    return (
        currentStudent ?
            <div className='student-container'>
                <div className='student-img-title-container'>
                    <div className='student-img-wrapper'>
                        {
                            !isEditMode ?
                                !currentStudent.Image.includes("data:") ?
                                    <img alt='student' className='student-img' src={require(`../assets/${currentStudent.Image}`)} />
                                    :
                                    <img alt='student' className='student-img-data' src={currentStudent.Image} />
                                : null
                        }
                        {
                            isEditMode && image ?
                                !image.includes("data:") ?
                                    <img alt='student' className='student-img' src={require(`../assets/${image}`)} />
                                    :
                                    <img alt='student' className='student-img-data' src={image} />
                                : null
                        }
                    </div>
                    {
                        !isEditMode ?
                            <h1>{currentStudent.Name}</h1>
                            :
                            <div className='student-details-name-input-wrapper'>
                                <TextInput errorMessage={errorNameMessage} text={name || ""} onFieldChange={onFieldChange} identifier="name" fontSize={1.5} />
                            </div>
                    }
                </div>
                <div className='student-details-container-size'>
                    <div className='student-details-container'>
                        <div className='student-details-title-wrapper'>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                < AddressBookIcon />
                                <h3>Details</h3>
                            </div>
                            {
                                isEditMode &&
                                <div className='camera-wrapper'>
                                    <label htmlFor='photo_input'>
                                        <CameraIcon />
                                    </label>
                                    <input type="file" accept='image/*' id="photo_input" onChange={(e) => onFieldChange("image", e)} />
                                </div>
                            }
                        </div>
                        <hr />
                        <Details errorMessage={errorAgeMessage} onFieldChange={onFieldChange} icon={<BirthdayCakeIcon />} text={isEditMode ? age || "" : currentStudent.Age.toString()} identifier="age" isEditMode={isEditMode} />
                        <Details errorMessage={errorGenderMessage} onFieldChange={onFieldChange} icon={<TransgenderIcon />} text={isEditMode ? gender || "" : currentStudent.Gender} identifier="gender" isEditMode={isEditMode} />
                        <Details errorMessage={errorSchoolMessage} onFieldChange={onFieldChange} icon={<GraduationHatIconV1 />} text={isEditMode ? school || "" : currentStudent.School} identifier="school" isEditMode={isEditMode} />
                        <Details errorMessage={errorCityMessage} onFieldChange={onFieldChange} icon={<MetroLocatinIcon />} text={isEditMode ? city || "" : currentStudent.City} identifier="city" isEditMode={isEditMode} />
                    </div>
                </div>
                <div className='student-edit-mode-wrapper-size'>
                    <div className='student-edit-mode-wrapper'>
                        {
                            !isEditMode ?
                                <button className='btn' onClick={() => handleActiveEditMode()}>Start edit mode</button>
                                :
                                <>
                                    <button className='btn' onClick={handleSaveChanges}>Save changes</button>
                                    <button className='btn' onClick={() => setIsEditMode(false)}>Cancel edit mode</button>
                                </>
                        }
                    </div>
                </div>
            </div >
            :
            null
    );

}

export default Student;
