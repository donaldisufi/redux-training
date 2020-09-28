import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as  Router } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import PublicLayout from "./layouts/PublicLayout";

/**
 * Pages
 */
import Blogs from './pages/Blogs';
import BlogsList from "./pages/blogs/blogs-list";
import BlogCreate from "./pages/blogs/blog-create";

/**
 * Public Pages
 */
import LoginPage from './pages/auth/LoginPage';
import Authorized from "./constainers/Authorized";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/auth">
                  <PublicLayout>
                      <Switch>
                          <Route exact path="/auth/login" component={LoginPage} />
                      </Switch>
                  </PublicLayout>
              </Route>
              <Route path="/">
                  <Authorized>
                      <MainLayout>
                          <Switch>
                              <Route exact path="/blogs" component={BlogsList} />
                              <Route exact path="/blogs/create" component={BlogCreate} />
                              <Route exact path="/" component={Blogs} />
                          </Switch>
                      </MainLayout>
                  </Authorized>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
