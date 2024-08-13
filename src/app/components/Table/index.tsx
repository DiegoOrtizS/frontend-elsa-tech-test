import React, { useState, useEffect } from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Dialog, FormControl } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ShouldRefreshProps } from '@/app/management/admin/accounts/components';

interface TableProps<T> {
  Form: React.FC<ShouldRefreshProps>;
  EditForm: React.FC<any>;
  handleDelete: (id: string) => Promise<void>;
  handleList: (page: number) => Promise<TableData<T>>;
  columns: Array<string>;
}

export interface TableData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const TableComponent = <T,>({
  Form,
  EditForm,
  handleDelete,
  handleList,
  columns,
}: TableProps<T>) => {
  const [form, setForm] = useState<string>('');
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const [clickedItem, setClickedItem] = useState<T | null>(null);
  const [data, setData] = useState<TableData<T>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 2;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await handleList(currentPage);
      setData(response);
    };
    fetchData();
  }, [currentPage, shouldRefetch]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage + 1);
  };

  const handleDeleteClick = async (id: string): Promise<void> => {
    await handleDelete(id);
    setShouldRefetch(prev => !prev);
  };

  return (
    <Paper>
      <IconButton onClick={(): void => setForm("register")}>
        <AddIcon /> Add New
      </IconButton>
      <Dialog open={form !== ""} onClose={(): void => setForm("")}>
        {form === "register" ? (
          <Form 
            setShouldRefresh={setShouldRefetch}
          /> ) : form === "edit" ? (
            <EditForm
              item={clickedItem}
              setShouldRefresh={setShouldRefetch}
            />) : null}
        
      </Dialog>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.map((item: any) => (
              <TableRow key={String(item.id)}>
                {columns.map((col) => (
                  <TableCell key={col}>
                    {typeof item[col] === 'object' ? JSON.stringify(item[col]) : item[col]}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={(): void => {
                    setForm("edit");
                    setClickedItem(item);
                    setShouldRefetch(!shouldRefetch);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={(): Promise<void> => handleDeleteClick(String(item.id))}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={data.count}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};

export default TableComponent;
