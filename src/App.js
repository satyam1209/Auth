
import './App.css';
import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { useAuth } from './components/Context/auth-hooks';
import { AuthContext } from './components/Context/auth-context';
import MainNavigation from './components/Navigation/MainNavigation';
import FrontPage from './components/pages/Front';
import Signup from './components/pages/Signup';
import LoginPage from './components/pages/LoginPage';
import ResetPassword from './components/pages/Resetpassword';

function App() {
  const {token,login,logout}=useAuth();
  const auth = useContext(AuthContext);

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn:!!token,
      token:token,
      logout:logout,
      login:login,
    }}
    >

      <Router>
        <MainNavigation/>
        <Switch>
          <Route path="/login" exact>
          <LoginPage/>
          </Route>
          <Route path="/signup" exact>
            <Signup/>
          </Route>
          <Route path="/" exact>
            <FrontPage/>

          </Route>
          <Route path="/forgetpassword" exact>
            <ResetPassword/>

          </Route>

        </Switch>
      </Router>


    </AuthContext.Provider>
  )

}

export default App;
