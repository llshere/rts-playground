import { FC } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createAction } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewUniv, Univ } from '../../redux/univListSlice';

import type { RootState } from '../../redux/store';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const init = createAction('staticList/init');

export const StaticList: FC = () => {
  const classes = useStyles();

  const univList: Univ[] = useAppSelector(
    (state: RootState) => state.univList.value
  );
  const errorMessage: string | null = useAppSelector(
    (state: RootState) => state.univList.error
  );

  const loadingStatus: string = useAppSelector(
    (state: RootState) => state.univList.status
  );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addNewUniv());
  };

  return (
    <div>
      <button onClick={handleClick}>search</button>

      {loadingStatus === 'loading' && <div>loading...</div>}
      {loadingStatus === 'failed' && { errorMessage }}
      {loadingStatus === 'succeeded' && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell align="right">country</TableCell>
                <TableCell align="right">webpages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {univList.map((univ) => (
                <TableRow key={univ.name}>
                  <TableCell component="th" scope="row">
                    {univ.name}
                  </TableCell>
                  <TableCell align="right">{univ.country}</TableCell>
                  <TableCell align="right">{univ.webPages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
