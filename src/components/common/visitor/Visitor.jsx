import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TextField, TableHead, TableRow, Paper, CircularProgress, Button, Select, MenuItem, InputLabel, FormControl, Pagination, PaginationItem } from '@mui/material';
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import Ajax from '../../../hooks/Ajax';
import styles from './Visitor.module.css';

const divisionOptions = [
  { id: 1, label: '企業' },
  { id: 2, label: '教員' },
  { id: 3, label: '学生' },
  { id: 4, label: 'OB・OG' },
  { id: 5, label: 'その他' }
];

const Visitor = () => {
  const token = useAuth();
  const [visitorData, setVisitorData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 1ページあたりの行数

  const fetchVisitorData = () => {
    setLoading(true);
    Ajax(null, token.token, 'visitor', 'get')
      .then((data) => {
        if (data.status === "success") {
          setVisitorData(data.visitor);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVisitorData();
    const intervalId = setInterval(fetchVisitorData, 60000);
    return () => clearInterval(intervalId);
  }, [token]);

  const filteredVisitors = visitorData.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          visitor.affiliation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = selectedDivision ? visitor.division === selectedDivision : true;

    return matchesSearch && matchesDivision;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedVisitors = filteredVisitors.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const downloadCSV = () => {
    const csvRows = [
      ['ID', '名前', '所属', 'メールアドレス'], // ヘッダー行
      ...filteredVisitors.map(visitor => [
        visitor.id,
        visitor.name,
        visitor.affiliation,
        visitor.email
      ])
    ];

    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvString], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'visitors.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.visitorTable}>
      <div className={styles.pageTitle}>
        <h2>来場者一覧</h2>
      </div>
      <div className={styles.sortArea}>
        <div style={{ display: "flex" }}>
          <TextField
            variant="outlined"
            placeholder="検索"
            className={styles.searchArea}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginLeft: '20px' }}
          />
          <FormControl variant="outlined" className={styles.divisionSelect}>
            <InputLabel>部門</InputLabel>
            <Select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              label="部門"
            >
              <MenuItem value="">
                <em>すべて</em>
              </MenuItem>
              {divisionOptions.map(option => (
                <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button variant="outlined" color="primary" onClick={downloadCSV}>
          CSVダウンロード
        </Button>
      </div>
      <div className={styles.listArea}>
        <TableContainer component={Paper} style={{ maxHeight: '100%', overflow: 'auto' }}>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    <CircularProgress />
                    <p>ロード中...</p>
                  </TableCell>
                </TableRow>
              ) : paginatedVisitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    <p>該当するデータは見つかりませんでした。</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVisitors.map((row) => (
                  <TableRow key={row.id} component={Link} to={`/admin/visitor/${row.id}`}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.affiliation}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        count={Math.ceil(filteredVisitors.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        className={styles.pageNation}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              backgroundColor: item.page === page ? 'primary.main' : 'transparent',
              color: item.page === page ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: item.page === page ? 'primary.main' : 'grey.300',
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default Visitor;
