import { useCallback, useState, useContext, useEffect } from 'react';
import { AuthContext } from 'context';
import { useHttp, useNotification } from 'hooks';
import { MainLayout } from 'layouts';
import { TablePagination, IconButton, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { DETAILS } from 'routes';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteLinkDialogs } from 'components';

const columns = [
  { id: 'index', label: '№', maxWidth: '10%' },
  {
    id: 'title',
    label: 'Title',
    maxWidth: '35%',
    align: 'left',
  },
  {
    id: 'short',
    label: 'Short',
    maxWidth: '35%',
    align: 'left',
  },
  {
    id: 'open',
    label: 'Open',
    maxWidth: '10%',
    align: 'left',
  },
  {
    id: 'remove',
    label: 'Actions',
    maxWidth: '10%',
    align: 'left',
  },
];

export const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const showNotification = useNotification();
  const { request } = useHttp();
  const [links, setLinks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/`, 'GET', null, {
        authorization: `Bearer ${token}`,
      });
      setLinks(data || []);
    } catch (error) {
      showNotification(error);
    }
  }, [request, showNotification, token]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (!links.length) {
    return (
      <MainLayout style={{ padding: '40px 40px 0 40px' }}>
        <Typography align="center" variant="h4" sx={{ color: '#444', fontFamily: 'helvetica' }}>
          Links not found
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout style={{ padding: '40px 40px 0 40px' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} width={column.maxWidth}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {links.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={`row${item?.id}${index}`} hover role="checkbox" tabIndex={-1}>
                  <TableCell width="5%">{index + 1}</TableCell>
                  <TableCell width="25%" style={{ minWidth: 0 }}>
                    <Typography noWrap style={{ maxWidth: '400px' }}>
                      {item.title || item.from}
                    </Typography>
                  </TableCell>
                  <TableCell width="35%">{item.to}</TableCell>
                  <TableCell width="10%">
                    <Link to={`${DETAILS}/${item._id}`} style={{ textDecoration: 'none', color: 'purple' }}>
                      Open
                    </Link>
                  </TableCell>
                  <TableCell width="10%">
                    <IconButton aria-label="delete" onClick={() => setOpen(index + 1)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <DeleteLinkDialogs
                    open={open === index + 1 ? true : false}
                    setOpen={setOpen}
                    linkTitle={item?.title}
                    linkId={item._id}
                    getLink={getLink}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {links.length > 10 ? (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={links.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
      </Paper>
    </MainLayout>
  );
};
