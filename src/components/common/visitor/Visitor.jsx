import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import jsonData from '../../../../sample.json'; // data.jsonの相対パスを指定
import styles from './Visitor.module.css'

const Visitor = () => {
  const [data, setData] = useState([]);

  // JSONファイルのデータを取得してstateにセット
  useEffect(() => {
    setData(jsonData.visitor); // JSONファイルのvisitor配列をセット
  }, []);

  return (
    <div className={styles.visitorTable}>
      <TableContainer component={Paper} sx={{maxHeight: '100%',maxWidth:'100%'}}>
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
            {data.map((row) => (
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
