import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/HomePage/Home/Home';
import Appoinment from './Pages/AppointmentPage/Appointment/Appoinment';
import Login from './Pages/LoginPage/Login/Login';
import Registration from './Pages/LoginPage/Registration/Registration';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/LoginPage/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/DashboardPage/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/home'>
              <Home></Home>
            </Route>
            <Route exact path='/login'>
              <Login></Login>
            </Route>
            <Route exact path='/register'>
              <Registration></Registration>
            </Route>
            <PrivateRoute exact path='/appointment'>
              <Appoinment></Appoinment>
            </PrivateRoute>
            <PrivateRoute path='/dashboard'>
              <Dashboard></Dashboard>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
