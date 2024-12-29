import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress } from '@mui/material';
import styles from './Visitor.module.css';
import ReactLoading from "react-loading";
import { useAuth } from '../../../context/AuthContext';
import Ajax from '../../../hooks/Ajax';

const Visitor = () => {
  const token = useAuth();
  const [visitorData, setVisitorData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態のステート

  const fetchVisitorData = () => {
    setLoading(true); // データ取得開始時にローディングをON
    Ajax(null, token.token, 'visitor', 'get')
      .then((data) => {
        if (data.status === "success") {
          setVisitorData(data.visitor);
          console.log("データ取得成功");
        } else {
          console.log(data.status);
        }
      })
      .finally(() => {
        setLoading(false); // データ取得完了時にローディングをOFF
      });
  };

  useEffect(() => {
    fetchVisitorData(); // 初回データ取得

    const intervalId = setInterval(fetchVisitorData, 60000); 

    return () => clearInterval(intervalId);
  }, [token]);

  const filteredVisitors = visitorData.filter(visitor => {
    return (
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.affiliation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={styles.visitorTable}>
      <div className={styles.pageTitle}>
        <h2>来場者一覧</h2>
      </div>
      <div className={styles.sortArea}>
        <input
          type='text'
          placeholder='検索'
          className={styles.searchArea}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.listArea}>
        {loading ? ( // ローディング中かどうかをチェック
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
            <p>ロード中...</p>
          </div>
        ) : (
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
                {filteredVisitors.map((row) => (
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
        )}
      </div>
    </div>
  );
};

export default Visitor;
