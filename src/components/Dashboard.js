import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = ({ authedUser, questions, users }) => {

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);


  return (
    <div>
      <h1 className="text-center m-2" data-testid="dashboard">
        DASHBOARD
      </h1>

      <h2 className="bg-success-subtle"><span>New Questions</span></h2>
      <div className="text-center" data-testid="unanswered">
        {questions.filter(unanswered).length === 0 && <strong className="text-success">All questions are answered.</strong>}
        {questions.filter(unanswered).map((question) => (
            <Question
            key={question.id}
            question={question}
            author={users[question.author]}
            isAnswered={false}
            /> 
        ))}
      </div>

      <hr />
    
      <h2 className="bg-secondary-subtle"><span>Answered Questions</span></h2>
      <div className="text-center" data-testid="answered">
        {questions.filter(answered).length === 0 && <strong className="text-success">No questions are answered.</strong>}
        {questions.filter(answered).map((question) => (
            <Question
            key={question.id}
            question={question}
            author={users[question.author]}
            isAnswered={true}
            />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);