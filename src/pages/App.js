import { Route, Routes, Navigate } from "react-router-dom";
import { handleInitData } from "../actions/shared";
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import LoginPage from "./pageLogin/LoginPage";
import Page404 from "./pageError/Page404";
import Dashboard from "../components/Dashboard";
import NavigateBar from "../components/NavigateBar";
import ChooseAnswerPage from "../components/ChooseAnswerPage";
import CreateNewQuestion from "../components/CreateNewQuestion";
import Topboard from "../components/Topboard";

function App({ dispatch, loggedUser }) {
  useEffect(() => {
    dispatch(handleInitData());
  });

  const redirection = window.location.href
    .toString()
    .split(window.location.host)[1];

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {loggedUser && <NavigateBar />}
        <Routes>
          <Route path="/login" exact element={<LoginPage />} />
          <Route
            path="*"
            element={
              loggedUser ? (
                <Page404 />
              ) : (
                <Navigate to={`/login?redirectTo=${redirection}`} />
              )
            }
          />
          <Route
            path="/"
            exact
            element={
              loggedUser ? (
                <Dashboard />
              ) : (
                <Navigate to={`/login?redirectTo=${redirection}`} />
              )
            }
          />
          <Route
            path="/add"
            element={
              loggedUser ? (
                <CreateNewQuestion />
              ) : (
                <Navigate to={`/login?redirectTo=${redirection}`} />
              )
            }
          />
          <Route
            path="/questions/:id"
            element={
              loggedUser ? (
                <ChooseAnswerPage />
              ) : (
                <Navigate to={`/login?redirectTo=${redirection}`} />
              )
            }
          />
          <Route
            path="/leaderboard"
            element={
              loggedUser ? (
                <Topboard />
              ) : (
                <Navigate to={`/login?redirectTo=${redirection}`} />
              )
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedUser: !!authedUser,
});

export default connect(mapStateToProps)(App);
