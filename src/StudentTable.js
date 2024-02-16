import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Update from './Update';
import { Form } from 'react-bootstrap';
import { HiArrowNarrowUp, HiArrowNarrowDown } from "react-icons/hi";

const StudentTable = () => {
    const [student, setStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedStudent, setUpdatedStudent] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [isSorted, setIsSorted] = useState(false);
    const [isSortedDecs, setIsSortedDecs] = useState(false);
    console.log(updatedStudent)
    
    useEffect(() => {
        const fetchStudent = async () => {
            // const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student`);
            // console.log(response)
            try {
                const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student?page=${currentPage}&limit=10&search=${searchTerm}`);
                // console.log(response.data);
                // console.log(response.data.length);
                setStudent(response.data);
                setTotalPages(response.data.length)
            } catch (error) {
                console.error('Error fetching student by ID:', error);
            }
        };
        fetchStudent();
    }, [currentPage, searchTerm]);

    const getStudent = async () => {
        // getStudent is made to use in handleDelete Function 
        try {
            const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student`);
            const data = response.data;
            console.log(data);
            // console.log(response.data.length);
            setStudent(data);
            setTotalPages(response.data.length)
        } catch (error) {
            console.error('Error fetching student by ID:', error);
        }
    };

    const handleEdit = (id) => {
        setIsModalOpen(true)
        setUpdatedStudent(id);
        // const fetchStudent = async () => {
        //     console.log(id)
        //     try {
        //         const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student/${id}`);
        //         console.log(response.data);
        //         console.log(response.data.length);
        //         setUpdatedStudent(response.data);
        //     } catch (error) {
        //         console.error('Error fetching student by ID:', error);
        //     }
        // };
        // fetchStudent();
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`https://60e953c2673e350017c219b1.mockapi.io/student/${id}`)
            console.log(response.data);
            alert("Deleted Successfully")
            getStudent();
            // setStudent(response.data)
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    }

    const handlePrevPage = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (sort, order) => {
        // e.preventDefault();
        setIsSorted(true);
        setIsSortedDecs(!isSortedDecs);
        console.log(isSortedDecs)
        const fetchStudent = async (sort, order) => {
            // const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student`);
            console.log(sort, order)
            try {
                const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student?page=${currentPage}&limit=10&sortBy=${sort}&order=${order}`);
                console.log(sort, order)
                console.log(response.data);
                console.log(response.data.length);
                if (sort === "id") {
                    const sortedStudent = response.data.sort((a, b) => a.sort - b.sort);
                    console.log(sortedStudent);
                    setStudent(response.data);
                }
                if (sort === "name") {
                    const sortedStudent = response.data.sort((a, b) => a.name.localeCompare(b.name));
                    console.log(sortedStudent);
                    setStudent(response.data);
                }
            } catch (error) {
                console.error('Error fetching student by ID:', error);
            }
        };
        fetchStudent(sort, order);
    }

    return (
        // <div className='col-md-12'>
        <div >
            <div className='student-search-sort'>
                { (updatedStudent && isModalOpen) ? (
                    // console.log(updatedStudent, isModalOpen)
                    <Update
                        studentId={updatedStudent}
                        setIsModalOpen={setIsModalOpen}
                    />
                ) :
                    <>
                        <Form.Control type="text" style={{ margin: '20px' }} placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                        <span>
                            <Link to="/form">
                                <button className='btn btn-primary'> Create New</button>
                            </Link>
                        </span>
                    </>
                }
            </div>

            {student && (
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id", "asc")}>ID {isSorted ? <span>{isSortedDecs ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />}</span> : ""}</th>
                            <th>Photo</th>
                            <th onClick={() => handleSort("name", "asc")}>Name{isSorted ? <span>{isSortedDecs ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />}</span> : ""}</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.map(student => (
                            <tr key={student.id}>
                                {/* {console.log(currentPage, totalPages, student.length)} */}
                                <td>{student.id}</td>
                                <td><img src={student.avatar} alt='avatar' height={40} width={70} /></td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                {/* <td><button onClick={() => handleEdit(student.id)} className='btn btn-success'> <Link to="/update"> Edit</Link></button></td> */}
                                <td><button onClick={() => handleEdit(student.id)} className='btn btn-success'>Edit </button></td>
                                <td><button onClick={() => { if (window.confirm('Are you sure to delete your data?')) { handleDelete(student.id) } }} className='btn btn-danger'>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn btn-primary'>Previous</button>
                <span >{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn btn-primary'>Next</button>
            </div>
            {/* Modal for editing data */}

        </div>
    )
};

export default StudentTable;