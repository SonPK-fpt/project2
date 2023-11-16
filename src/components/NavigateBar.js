import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { handleUserLogout } from "../actions/authedUser";
import { connect } from "react-redux";
import avatars from "../img/index";

const NavigateBar = ({ dispatch, loggedUser }) => {

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(handleUserLogout());
    };

    function getUserAvatarName(avatar) {
      const avaName = avatar.toString();
      return avaName.split('/')[3].split('.')[0];
    }

    return(
      <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Link className="text-decoration-none m-3" to="/">Home</Link>
            <Link className="text-decoration-none m-3" to="/leaderboard">Leaderboard</Link>
            <Link className="text-decoration-none m-3" to="/add">New question</Link>
          </Nav>
          <Navbar.Brand>
            <Image
              src={avatars.filter((a) => 
                getUserAvatarName(a) === loggedUser
              )}
              className="d-inline-block align-top rounded-circle"
              width="30"
              height="30"
            />{'   '}
            {loggedUser}
          </Navbar.Brand>
          <Button variant="light" type="button" onClick={handleLogout}>Log out</Button>  
        </Container>
      </Navbar>
      </div>
    )
}

const mapStateToProps = ({authedUser}) => ({
    loggedUser: authedUser.id,
});


export default connect(mapStateToProps)(NavigateBar);