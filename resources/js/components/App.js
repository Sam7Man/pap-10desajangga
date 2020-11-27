import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './component/Header/Header';
import Login from './Pages/LoginRegister/Login';
import About from './Pages/About/About';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/config';
import Dashboard from './Pages/Admin/Dashboard';
import PrivateRoute from './Pages/PrivateRoute';
import AuthRoute from './Pages/Routes/AuthRoute';
import Article from './Pages/Article/Article';
import HeaderPages from './component/Header/HeaderPages';
import ScrollToTop from './Utils/scrollToTop';
import Footer from './component/Footer/Footer';
import SingleArticle from './Pages/Article/SingleArticle/SingelArticle';
import Register from './Pages/LoginRegister/Register';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ArticleAdmin from './Pages/Admin/ArticleAdmin/ArticleAdmin';
import CreateArticle from './Pages/Admin/CreateArticle/CreateArticle';

function App() {
  const THEME = createMuiTheme({
    typography: {
      "fontFamily": `"Poppins", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
    }
  });
  return (
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <ScrollToTop />
            <Switch>
              <Route exact path="/article/:postSlug">
                <HeaderPages option={true} scroll={-1} />
                <SingleArticle />
                <Footer />
              </Route>
              <Route exact path="/about">
                <HeaderPages option={true} scroll={-1} />
                <About />
              </Route>
              <Route exact path="/article">
                <HeaderPages option={true} scroll={-1} />
                <Article />
                <Footer />
              </Route>
              <PrivateRoute exact path='/dashboard/create' component={CreateArticle} />
              <PrivateRoute exact path='/dashboard/article' component={ArticleAdmin} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route exact path="/">
                <Header option={false} scroll={250} />
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;


if (document.getElementById('example')) {
  ReactDOM.render(<App />, document.getElementById('example'));
}
