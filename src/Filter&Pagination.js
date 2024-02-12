import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  "./Filter&Pagination.css";

const Pagination = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student?page=${currentPage}&limit=10&search=${searchTerm}`);
        const data = response.data;
        console.log(response);
        setStudents(data);
        console.log(response.headers['x-total-pages']);
        setTotalPages(response.headers['x-total-pages']);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, [currentPage, searchTerm]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2 className="nav">Student Data</h2>
      {/* <div >
        <input type="text" className='input' value={searchTerm} onChange={handleSearch} placeholder="Search..." />
      </div> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Age</th>
            <th>Grade</th> */}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              {/* <td>{student.age}</td>
              <td>{student.grade}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
