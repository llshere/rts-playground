import { FC } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { MyList } from './components/my-list';
import { StaticList } from './components/static-list';

export const App: FC = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/StaticList">StaticList</Link>
          </li>
          <li>
            <Link to="/MyList">MyList</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/StaticList">
            <StaticList />
          </Route>
          <Route path="/MyList">
            <MyList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
