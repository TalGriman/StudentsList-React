import React, { FC, useState, useEffect } from 'react';
import Card from '../components/Card';
import { Student } from '../Common/Interfaces';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation } from 'react-router-dom';

const api = "https://run.mocky.io/v3/604809af-e40e-4ed8-8c4a-2ccad6c72571";

interface Pagination {
    selected: number;
}


const Home: FC = (props) => {

    // navigation varibles
    const navigate = useNavigate();
    const location = useLocation();

    // states
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [checkedStudents, setCheckedStudents] = useState<number[]>([]);
    const [isCheckedboxVisible, setIsCheckedboxVisible] = useState<boolean>(false);

    //varibles
    const studentsPerPage: number = 6; // amount of student that will render per page.
    const pageVisited: number = pageNumber * studentsPerPage; // will help to slice the array as start point.
    const pageCount = Math.ceil(students.length / studentsPerPage); // amount of total pages that pagination need.

    // happned when the page reload
    useEffect(() => {
        const startApp = async () => {
            const storageData = sessionStorage.getItem("students");
            let apiData;
            if (storageData === null) {
                apiData = await getAllStudentsFromApi();
                sessionStorage.setItem("students", JSON.stringify(apiData));
            }
            setStudents(storageData === null ? apiData : JSON.parse(storageData));
            setPageLoading(true);
        };
        startApp();
    }, []);

    // happned when swich page from the url browser and when students array change
    useEffect(() => {
        if (students.length > 0) {
            const pageNum = parseInt(location.pathname.split("/")[2]); // get num of page by browser url
            const maxPage = Math.ceil(students.length / studentsPerPage); // get max num of page
            if (location.pathname === "/" || !(pageNum > 0 && pageNum <= maxPage)) { // redirect to home
                setPageNumber(0);
                navigate("/");
                return;
            }
            setPageNumber(pageNum - 1)
        }
    }, [students, navigate, location.pathname]);

    // fatch call to the list of students from the api
    const getAllStudentsFromApi = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const fetchResponse = await fetch(api, settings);
            if (!fetchResponse.ok) {
                console.error("Something went wrong while get the students.");
                return undefined;
            }
            const data = await fetchResponse.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    };

    // insert/remove selected students to/from the state array.
    const handleSelectStudent = (id: number, isChecked: boolean) => {
        let tempArr = [...checkedStudents];
        if (isChecked) {
            tempArr.push(id);
        }
        else {
            tempArr = tempArr.filter((num) => id !== num);
        }
        setCheckedStudents(tempArr);
    };

    // render the students to the screen
    const renderStudents = students
        .slice(pageVisited, pageVisited + studentsPerPage)
        .map((student: Student) => {
            return (
                <Card
                    key={student.ID}
                    student={student}
                    checkedStudents={checkedStudents}
                    isCheckedboxVisible={isCheckedboxVisible}
                    handleSelectStudent={handleSelectStudent}
                />
            );
        });

    // onChange fuction that happned while click the pagination.
    const changePage = ({ selected }: Pagination) => {
        navigate(`page/${selected + 1}`)
        setPageNumber(selected);
    };

    // delete the selected students from the state and update the seasson storage
    const handleSelectionUsersDelete = () => {
        let tempArr = [...students];
        for (let i = 0; i < checkedStudents.length; i++) {
            tempArr = tempArr.filter((student) => student.ID !== checkedStudents[i]);
        }
        sessionStorage.setItem("students", JSON.stringify(tempArr));
        setStudents(tempArr);
        setCheckedStudents([]);
    };

    // cancel checkboxes visible
    const handleCancelCheckboxVisibility = () => {
        setCheckedStudents([]);
        setIsCheckedboxVisible(false);
    };



    return (
        pageLoading ?
            <div className='container-home'>
                <div className='wrapper-delete-srudents'>
                    {
                        !isCheckedboxVisible ?
                            <>
                                <p>For deletion option:</p>
                                <div className='delete-srudents-btn-wrapper'>
                                    <button onClick={() => setIsCheckedboxVisible(true)} className='btn'>Click here</button>
                                </div>
                            </>
                            :
                            <>
                                {
                                    checkedStudents.length !== 0 &&

                                    <div className='delete-srudents-btn-wrapper'>
                                        <button onClick={handleSelectionUsersDelete} className='btn'>Delete</button>
                                    </div>
                                }
                                <p>Selected {checkedStudents.length}/3</p>
                                <div className='delete-srudents-btn-wrapper'>
                                    <button onClick={handleCancelCheckboxVisibility} className='btn'>Cancel</button>
                                </div>
                            </>
                    }
                </div>
                <div className='wrapper-student-list'>
                    {renderStudents}
                </div>

                <div className='wrapper-pagination'>
                    <ReactPaginate
                        forcePage={pageNumber}
                        previousLabel="< Previous"
                        nextLabel="Next >"
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName="container-pagination"
                        previousLinkClassName="previous-link-pagination"
                        nextLinkClassName="next-link-pagination"
                        disabledClassName="disabled-pagination"
                        activeClassName="active-pagination"
                        pageClassName="page-pagination"
                    />
                </div>
            </div>
            :
            <div style={{ textAlign: "center" }}>
                <h3>Loading...</h3>
            </div>
    );
}

export default Home;