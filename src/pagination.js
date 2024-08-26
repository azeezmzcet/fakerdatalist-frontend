import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, setCurrentPage, setSearchQuery, setRowsPerPage } from "./redux/postsSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

function Paginationn() {
  const dispatch = useDispatch();
  const { posts, currentPage, searchQuery, totalPages, rowsPerPage } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, rowsPerPage }));
  }, [ rowsPerPage]);

  const handlePageChange = (event, page) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchPosts({ page, rowsPerPage }));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleJumpChange = () => {
    dispatch(fetchPosts({ page: 1, searchQuery, rowsPerPage }));
    dispatch(setCurrentPage(1));
  };

  const handleRowsPerPageChange = (e) => {
    dispatch(setRowsPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1)); // Reset to the first page when changing rows per page
  };

  const theme = createTheme({
    palette: {
      primary: blue,
    },
  });

  return (
    <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          style={{ marginRight: '10px' }}
        />
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" onClick={handleJumpChange}>
            Ok
          </Button>
        </ThemeProvider>
      </div>

      <FormControl variant="outlined" size="small" style={{ width: '70px' }}>
        <InputLabel>value</InputLabel>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          label="value"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </div>

    <TableContainer
      style={{ maxHeight: "480px", overflowY: "auto", marginTop: "30px", flex: 1 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Email</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.name}</TableCell>
              <TableCell>{post.phone}</TableCell>
              <TableCell>{post.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <ThemeProvider theme={theme}>
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          size="large"
          onChange={handlePageChange}
        />
      </ThemeProvider>
    </div>
  </Container>
  );
}

export default Paginationn;
