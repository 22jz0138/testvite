import * as React from 'react';
import {useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
// import styles

const VISIBLE_FIELDS = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'grade', headerName: '学年', width: 150 },
    { field: 'team_id', headerName: 'チーム番号', width: 150 },
    { field: 'name', headerName: '氏名', width: 300 },
    { field: 'number', headerName: '学籍番号 ', width: 400 },
    { field: 'employment_target_id', headerName: '内定先ID', width: 400 },
];

export default function BasicExampleDataGrid() {
    const token = useAuth();
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        Ajax(null, token.token, 'student', 'get')
        .then((data) => {
            if(data.status === "success") {
                setStudentData(data.student);
                console.log("dekita");
            } else {
                console.log(data.status);
            }
        });
    }, [token]);

    return (
        <div style={{ height: 600 }}>
            <DataGrid rows={studentData} columns={VISIBLE_FIELDS} pageSize={5} />
        </div>
    );
}
