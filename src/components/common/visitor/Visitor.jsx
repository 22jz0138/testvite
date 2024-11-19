import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styles from './Visitor.module.css';
import { useAuth } from '../../../context/AuthContext';
import Ajax from '../../../hooks/Ajax';

const Visitor = () => {
  const token = useAuth();
  const [visitorData, setVisitorData] = useState([]);

  const fetchVisitorData = () => {
    Ajax(null, token.token, 'visitor', 'get')
      .then((data) => {
        if (data.status === "success") {
          setVisitorData(data.visitor);
          console.log("データ取得成功");
        } else {
          console.log(data.status);
        }
      });
  };

  useEffect(() => {
    fetchVisitorData(); // 初回データ取得

    const intervalId = setInterval(fetchVisitorData, 5000); // 5秒ごとにデータを取得

    return () => clearInterval(intervalId); // コンポーネントがアンマウントされるときにintervalをクリア
  }, [token]);

  return (
    <div className={styles.visitorTable}>
      <TableContainer component={Paper} sx={{ maxHeight: '100%', maxWidth: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>所属</TableCell>
              <TableCell>メールアドレス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitorData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.affiliation}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Visitor;
