import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { CustomComponent } from './components/CustomComponent';

interface Props {}

function App(props: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <CustomComponent />
        </Route>
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default hot(App);
