import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as  Router } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

/**
 * Pages
 */
import Blogs from './pages/Blogs';
import BlogsList from "./pages/blogs/blogs-list";
import BlogCreate from "./pages/blogs/blog-create";

function App() {
  return (
      <Router>
          <Switch>
              <MainLayout>
                  <Route exact path="/blogs" component={BlogsList} />
                  <Route exact path="/blogs/create" component={BlogCreate} />
                  <Route exact path="/" component={Blogs} />
              </MainLayout>
          </Switch>
      </Router>
  );
}

export default App;
