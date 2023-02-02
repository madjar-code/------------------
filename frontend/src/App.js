import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import { useContext } from 'react';
import AuthContext from './context/AuthContext';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalAccount from './pages/PersonalAccount';
import Welcome from './pages/Welcome';
import Ask from './pages/Ask';

import './App.css';
import PasswordReset from './pages/PasswordReset';
import MyProfiles from './pages/MyProfiles';
import CreateProfile from './pages/CreateProfile';
import ProfileDetails from './pages/ProfileDetails';
import MyRoutes from './pages/MyRoutes';
import CreateRoute from './pages/CreateRoute';
import CareerPage from './pages/CareerPage';
import EducationPage from './pages/EducationPage';
import EduCourses from './pages/EduCourses';
import EduTests from './pages/EduTests';
import EduArticles from './pages/EduArticles';
import CareerVacancies from './pages/CarrerVacancies';
import CareerTests from './pages/CareerTests';
import CareerArticles from './pages/CareerArticles';
import RouteDetails from './pages/RouteDetails';
import ActualPage from './pages/ActualPage';
import RecommendationDetails from './pages/RecommendationDetails';

function PrivateRoute({ children }) {
  let { authTokens } = useContext(AuthContext)
  return authTokens ? children : <Navigate to="/login"/>
}


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route
            path='/personal-account'
            element={
              <PrivateRoute>
                <PersonalAccount/>
              </PrivateRoute>
            }/>
          <Route
            path='/my-profiles'
            element={
              <PrivateRoute>
                <MyProfiles/>
              </PrivateRoute>
            }/>
          <Route
            path='/my-profiles/:id'
            element={
              <PrivateRoute>
                <ProfileDetails/>
              </PrivateRoute>
            }/>
          <Route
            path='/my-routes/:id'
            element={
              <PrivateRoute>
                <RouteDetails/>
              </PrivateRoute>
            }/>
          <Route
            path='/create-profile'
            element={
              <PrivateRoute>
                <CreateProfile/>
              </PrivateRoute>
            }/>
          <Route
            path='/my-routes'
            element={
              <PrivateRoute>
                <MyRoutes/>
              </PrivateRoute>
            }/>
          <Route
            path='/create-route'
            element={
              <PrivateRoute>
                <CreateRoute/>
              </PrivateRoute>
            }/>
          <Route
            path='/career'
            element={
              <PrivateRoute>
                <CareerPage/>
              </PrivateRoute>
            }/>
          <Route
            path='/education'
            element={
              <PrivateRoute>
                <EducationPage/>
              </PrivateRoute>
            }/>
          <Route
            path='/edu-courses'
            element={
              <PrivateRoute>
                <EduCourses/>
              </PrivateRoute>
            }/>
          <Route
            path='/edu-tests'
            element={
              <PrivateRoute>
                <EduTests/>
              </PrivateRoute>
            }/>
          <Route
            path='/edu-articles'
            element={
              <PrivateRoute>
                <EduArticles/>
              </PrivateRoute>
            }/>
          <Route
            path='/career-vacancies'
            element={
              <PrivateRoute>
                <CareerVacancies/>
              </PrivateRoute>
            }/>
          <Route
            path='/career-tests'
            element={
              <PrivateRoute>
                <CareerTests/>
              </PrivateRoute>
            }/>
          <Route
            path='/career-articles'
            element={
              <PrivateRoute>
                <CareerArticles/>
              </PrivateRoute>
            }/>
          <Route
            path='/actual'
            element={
              <PrivateRoute>
                <ActualPage/>
              </PrivateRoute>
            }/>
          <Route
            path='/recommendations/:id'
            element={
              <PrivateRoute>
                <RecommendationDetails/>
              </PrivateRoute>
            }/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/ask' element={<Ask/>}/>
          <Route path='/password-reset' element={<PasswordReset/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
