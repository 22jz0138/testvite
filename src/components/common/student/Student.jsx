// import * as React from 'react';
// import {useState,useEffect} from 'react';
// import Ajax from '../../../hooks/Ajax';
// import { useAuth } from '../../../context/AuthContext';
// import StudentAddModal from '../../base/modal/studentaddmodal/StudentAddModal';
// import { Link } from "react-router-dom";
// import styles from './Student.module.css';

// export default function Student() {
//     const token = useAuth();
//     const [studentData, setStudentData] = useState([]);
//     const [StudentDetail, setStudentDetail] = useState();
//     const [teamData,setTeamData] = useState();
//     const [showModal, setShowModal] = useState(false);
//     const handleDetailClick = (e) =>{
//         const studentId  = e.target.getAttribute("data-key");
//         setStudentData(studentId);
//     }
//     const ShowModal = () => {
//         console.log("おされた");
//         Ajax(null, token.token, 'team', 'get')
//         .then((data) => {
//             if(data.status === "success") {
//                 setTeamData(data.team);
//                 console.log("dekita");
//                 console.log("チームデータ",data);
//             } else {
//                 console.log(data.status);
//             }
//             setShowModal(true);
//         });
//         console.log(showModal);
//       };

//     useEffect(() => {
//         Ajax(null, token.token, 'student', 'get')
//         .then((data) => {
//             if(data.status === "success") {
//                 setStudentData(data.student);
//                 console.log("dekita");
//             } else {
//                 console.log(data.status);
//             }
//         });
//     }, [token]);

//     return (
//         <>
//             <div className={styles.listArea}>
//                 <div className={styles.processingArea}>
//                     <button className={styles.addeStudentButton} onClick={ShowModal}><p>+ </p></button>
//                 </div>
//                 {showModal && <StudentAddModal showFlag={showModal} setShowModal={setShowModal} selectData={teamData}/>}
//                 <div className={styles.studentListArea}>
//                     <div className={styles.listHeader}>
//                         <ul className={styles.listTitle}>
//                             <li>ID</li>
//                             <li>学年</li>
//                             <li>チーム番号</li>
//                             <li>氏名</li>
//                             <li>学籍番号</li>
//                             <li>内定先ID</li>
//                         </ul>
//                     </div>
//                     <div className={styles.columnBody}>
//                         {studentData.map((item) => (
//                         <Link
//                         to={`/admin/student/${item.id}`}
//                         >
//                             <ul key={item.number} className={styles.studentsColumnWrapper}>
//                                 <div key={item.name} data-key={item.id} className={styles.studentsColumn} onClick={handleDetailClick}>
//                                     <li>{item.id}</li>
//                                     <li>{item.grade}</li>
//                                     <li>{item.team_id}</li>
//                                     <li>{item.name}</li>
//                                     <li>{item.number}</li>
//                                     <li>{item.employment_target_id}</li>
//                                 </div>
//                             </ul>
//                         </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from "react-router-dom";
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import StudentAddModal from '../../base/modal/studentaddmodal/StudentAddModal';
import styles from './Student.module.css';

export default function Student() {
  const token = useAuth();
  const [studentData, setStudentData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('grade'); // デフォルトのソートキー
  const [sortDirection, setSortDirection] = useState('ascending'); // ソート方向
  const [selectedGrade, setSelectedGrade] = useState(''); // フィルター用の学年
  const [selectedTeam, setSelectedTeam] = useState(''); // フィルター用のチーム番号

  const ShowModal = () => {
    setLoading(true);
    Ajax(null, token.token, 'team', 'get')
      .then((data) => {
        if (data.status === "success") {
          setTeamData(data.team);
        } else {
          console.log(data.status);
        }
        setShowModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    Ajax(null, token.token, 'student', 'get')
      .then((data) => {
        if (data.status === "success") {
          setStudentData(data.student);
        } else {
          console.log(data.status);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // 検索機能
  const filteredStudents = studentData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.number.toString().includes(searchTerm);
    const matchesGrade = selectedGrade ? student.grade === selectedGrade : true;
    const matchesTeam = selectedTeam ? student.team_id === selectedTeam : true;
    return matchesSearch && matchesGrade && matchesTeam;
  });

  // ソート機能
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue < bValue) {
      return sortDirection === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    const direction = (sortKey === key && sortDirection === 'ascending') ? 'descending' : 'ascending';
    setSortKey(key);
    setSortDirection(direction);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <>
      <div className={styles.listArea}>
        <div>
            
        </div>
        <div className={styles.processingArea}>
          <TextField
            variant="outlined"
            placeholder="検索"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginLeft: '20px' }}
          />
          <FormControl variant="outlined" style={{ marginLeft: '20px',width: '100px' }}>
            <InputLabel>学年</InputLabel>
            <Select
              value={selectedGrade}
              onChange={handleGradeChange}
              label="学年フィルター"
            >
              <MenuItem value="">全て</MenuItem>
              {Array.from(new Set(studentData.map(student => student.grade))).map(grade => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ marginLeft: '20px',width: '100px' }}>
            <InputLabel>チーム</InputLabel>
            <Select
              value={selectedTeam}
              onChange={handleTeamChange}
              label="チームフィルター"
            >
              <MenuItem value="">全て</MenuItem>
              {Array.from(new Set(studentData.map(student => student.team_id))).map(team => (
                <MenuItem key={team} value={team}>{team}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={ShowModal}>
            + 学生登録
          </Button>
        </div>

        {showModal && (
          <StudentAddModal 
            showFlag={showModal} 
            setShowModal={setShowModal} 
            selectData={teamData} 
          />
        )}

        <div className={styles.studentListArea}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                    ID {sortKey === 'id' && (sortDirection === 'ascending' ? '↑' : '↓')}
                  </TableCell>
                  <TableCell onClick={() => handleSort('grade')} style={{ cursor: 'pointer' }}>
                    学年 {sortKey === 'grade' && (sortDirection === 'ascending' ? '↑' : '↓')}
                  </TableCell>
                  <TableCell onClick={() => handleSort('team_id')} style={{ cursor: 'pointer' }}>
                    チーム番号 {sortKey === 'team_id' && (sortDirection === 'ascending' ? '↑' : '↓')}
                  </TableCell>
                  <TableCell>氏名</TableCell>
                  <TableCell>学籍番号</TableCell>
                  <TableCell>内定先ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                      <CircularProgress />
                      <p>ロード中...</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedStudents.map((item) => (
                    <TableRow key={item.id} component={Link} to={`/admin/student/${item.id}`}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.grade}</TableCell>
                      <TableCell>{item.team_id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.employment_target_id}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
