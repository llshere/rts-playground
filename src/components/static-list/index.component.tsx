import { FC, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface Univ {
  name: string;
  country: string;
  web_pages: string;
}

const createData = (
  name: string,
  country: string,
  web_pages: string
): Univ => ({
  name,
  country,
  web_pages,
});

export const StaticList: FC = () => {
  const classes = useStyles();

  const [univList, setUnivList] = useState<Univ[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const handleClick = () => {
    setUnivList([]);
    setLoadingMessage('loading...');
    fetch('http://universities.hipolabs.com/search?country=United+States')
      .then((res) => res.json())
      .then(
        (result: Univ[]) => {
          const resultUnivList = result
            .slice(0, 10)
            .map((el) => createData(el.name, el.country, el.web_pages));
          setLoadingMessage('');
          setUnivList(resultUnivList);
        },
        (error) => {
          setLoadingMessage(error.toString());
        }
      );
  };

  return (
    <div>
      <button onClick={handleClick}>search</button>
      <div>{loadingMessage}</div>

      {univList.length !== 0 && (
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
                  <TableCell align="right">{univ.web_pages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
