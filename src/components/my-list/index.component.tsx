import { FC } from 'react';

import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  useAppDispatch,
  useAppSelector
} from '../../redux/hooks';
import {
  clearComment,
  editComment,
  Univ
} from '../../redux/univListSlice';

import type { RootState } from '../../redux/store';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const MyList: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const univList: Univ[] = useAppSelector(
    (state: RootState) => state.univList.value
  );
  const loadingStatus: string = useAppSelector(
    (state: RootState) => state.univList.status
  );

  const handleChangeComment =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(editComment(index, event.target.value));
    };

  const handleClickButton = () => {
    dispatch(clearComment());
  };

  return (
    <div>
      {loadingStatus === 'succeeded' && (
        <div>
          <div>please add some comment in comment column</div>
          <button onClick={handleClickButton}>clear all comments</button>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell align="right">country</TableCell>
                  <TableCell align="right">webpages</TableCell>
                  <TableCell align="right">comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {univList.map((univ, index: number) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {univ.name}
                    </TableCell>
                    <TableCell align="right">{univ.country}</TableCell>
                    <TableCell align="right">{univ.webPages}</TableCell>
                    <TableCell align="right">
                      <Input
                        value={univ.comment}
                        onChange={handleChangeComment(index)}
                        disableUnderline={true}
                      ></Input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};
