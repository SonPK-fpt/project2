import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import avatars from "../img/index";
import { handleCreateQuestion } from "../actions/questions";

const CreateNewQuestion = ({ dispatch, loggedUser }) => {
  const navigate = useNavigate();

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleOptionOneChange = (e) => {
    setOptionOne(e.target.value);
  };

  const handleOptionTwoChange = (e) => {
    setOptionTwo(e.target.value);
  };

  function getUserAvatarName(avatar) {
    const avaName = avatar.toString();
    return avaName.split(".")[0];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = localStorage.getItem(loggedUser.id);
    if (optionOne && optionTwo) {
      dispatch(handleCreateQuestion(optionOne, optionTwo, loggedUser));
      localStorage.setItem(loggedUser.id, ++data);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="text-center m-2">
        <h3 data-testid="title1">Would You Rather</h3>
        <Image
          src={avatars.filter((a) => getUserAvatarName(a) === loggedUser.id)}
          className="rounded-circle"
          width="250"
          height="250"
        />
        <h4 data-testid="title2">Create your own poll</h4>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="d-inline">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label className="text-center" data-testid="optionOneText">
              Option one
            </Form.Label>
            <Form.Control
              data-testid="optionOne"
              type="text"
              placeholder="Option one"
              onChange={handleOptionOneChange}
              value={optionOne}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label className="text-center" data-testid="optionTwoText">
              Option two
            </Form.Label>
            <Form.Control
              data-testid="optionTwo"
              type="text"
              placeholder="Option two"
              onChange={handleOptionTwoChange}
              value={optionTwo}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              disabled={!optionOne || !optionTwo}
              data-testid="submit"
            >
              Create
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedUser: authedUser,
});

export default connect(mapStateToProps)(CreateNewQuestion);
