import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { handleUserLogin } from "../../actions/authedUser";
import { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginPage = ({ dispatch, loggedUser }) => {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");

  if (loggedUser) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUserIdChange = (event) => {
    const id = event.target.value;
    setUserID(id);
  };

  const handleUserPwChange = (event) => {
    const pw = event.target.value;
    setUserPassword(pw);
  };

  const handleQuickLogin = (e) => {
    switch (e.target.value) {
      case "sarahedo":
        dispatch(handleUserLogin("sarahedo", "password123"));
        return;
      case "tylermcginnis":
        dispatch(handleUserLogin("tylermcginnis", "abc321"));
        return;
      case "mtsamis":
        dispatch(handleUserLogin("mtsamis", "xyz123"));
        return;
      case "zoshikanlu":
        dispatch(handleUserLogin("zoshikanlu", "pass246"));
        return;
      default:
        return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleUserLogin(userID, userPassword));
    setUserID("");
    setUserPassword("");
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4 text-center">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    EMPLOYEE POLLS
                  </h2>
                  <strong>Log In</strong>
                  <div
                    className="align-items-center"
                    style={{ margin: "0 auto" }}
                  >
                    <Form.Select
                      className="mb-3 mt-2 text-center"
                      onChange={handleQuickLogin}
                      data-testid="quickLogin"
                    >
                      <option value="">Select user</option>
                      <option value="sarahedo">sarahedo</option>
                      <option value="tylermcginnis">tylermcginnis</option>
                      <option value="zoshikanlu">zoshikanlu</option>
                      <option value="mtsamis">mtsamis</option>
                    </Form.Select>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label className="text-center">Your ID</Form.Label>
                        <Form.Control
                          data-testid="username"
                          type="text"
                          placeholder="ID"
                          onChange={handleUserIdChange}
                          value={userID}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          data-testid="password"
                          type="password"
                          placeholder="Password"
                          onChange={handleUserPwChange}
                          value={userPassword}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          data-testid="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedUser: !!authedUser,
});

export default connect(mapStateToProps)(LoginPage);
