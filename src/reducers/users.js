import { RECEIVE_USERS, CREATE_QUESTION_USER, ANSWER_QUESTION_USER } from "../actions/users";

export const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case CREATE_QUESTION_USER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.qid)
        }
      };
      case ANSWER_QUESTION_USER:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer
            }
          }
        };
    default:
      return state;
  }
}