import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';

const VISIBLE_FIELDS = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'grade', headerName: '学年', width: 150 },
    { field: 'team_id', headerName: 'チーム番号', width: 130 },
    { field: 'name', headerName: '氏名', width: 250 },
    { field: 'number', headerName: '学籍番号 ', width: 200 },
    { field: 'employment_target_id', headerName: '内定先ID', width: 200 },
];

export default function BasicExampleDataGrid() {
    const token = useAuth();
    const [studentData, setStudentData] = React.useState([]);
    React.useEffect(() => {
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
        <div style={{ height: 400, maxWidth: '100%' }}>
            <DataGrid rows={studentData} columns={VISIBLE_FIELDS} pageSize={5} />
        </div>
    );
}
