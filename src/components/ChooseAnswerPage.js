import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import avatars from "../img/index";
import { handleCreateAnswer } from "../actions/questions";

const ChooseAnswerPage = ({ dispatch, authedUser, question, author }) => {
  const navigate = useNavigate();

  if (!authedUser || !question || !author) {
    return <Navigate to="/404" />;
  }

  const isChoosingOptionOne = question.optionOne.votes.includes(authedUser.id);
  const isChoosingOptionTwo = question.optionTwo.votes.includes(authedUser.id);

  const handleOptionOneChoose = (e) => {
    e.preventDefault();
    dispatch(handleCreateAnswer(question.id, "optionOne"));
    navigate("/");
  };

  const handleOptionTwoChoose = (e) => {
    e.preventDefault();
    dispatch(handleCreateAnswer(question.id, "optionTwo"));
    navigate("/");
  };

  function getUserAvatarName(avatar) {
    const avaName = avatar.toString();
    return avaName.split("/")[3].split(".")[0];
  }

  const percentEstimate = (option, question) => {
    const totalAnswer =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    return option === "optionOne"
      ? (question.optionOne.votes.length / totalAnswer) * 100 + " %"
      : (question.optionTwo.votes.length / totalAnswer) * 100 + " %";
  };

  return (
    <div>
      <h1 className="text-center m-2">Poll by {author.id}</h1>

      <div className="text-center">
        <Image
          src={avatars.filter((a) => getUserAvatarName(a) === author.id)}
          className="rounded-circle"
          width="350"
          height="350"
        />
        <h2 className="m-2">Would you rather</h2>

        <Button
          className="m-5 option-btn"
          variant={isChoosingOptionOne ? "primary" : "secondary"}
          onClick={handleOptionOneChoose}
          disabled={isChoosingOptionOne || isChoosingOptionTwo}
        >
          <div>
            <span>{question.optionOne.text}</span>
            {!isChoosingOptionOne && !isChoosingOptionTwo && <p> </p>}
            {(isChoosingOptionOne || isChoosingOptionTwo) && (
              <p className="text-xs">
                Votes: {question.optionOne.votes.length} (
                {percentEstimate("optionOne", question)})
              </p>
            )}
          </div>
        </Button>

        <Button
          className="m-5 option-btn"
          variant={isChoosingOptionTwo ? "primary" : "secondary"}
          onClick={handleOptionTwoChoose}
          disabled={isChoosingOptionOne || isChoosingOptionTwo}
        >
          <span>{question.optionTwo.text}</span>
          {!isChoosingOptionOne && !isChoosingOptionTwo && <p> </p>}
          {(isChoosingOptionOne || isChoosingOptionTwo) && (
            <p className="text-xs">
              Votes: {question.optionTwo.votes.length} (
              {percentEstimate("optionTwo", question)})
            </p>
          )}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  const question = Object.values(questions).find(
    (question) => question.id === useParams().id
  );
  const author = Object.values(users).find(
    (user) => user.id === question?.author
  );
  return { authedUser, question, author };
};

export default connect(mapStateToProps)(ChooseAnswerPage);
