export const RECEIVE_USERS = "RECEIVE_USERS";
export const CREATE_QUESTION_USER = "CREATE_QUESTION_USER";
export const ANSWER_QUESTION_USER = "ANSWER_QUESTION_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function createQuestionUser({ id, author }) {
    return {
        type: CREATE_QUESTION_USER,
        id,
        author,
    }
}

export function answerQuestionUser(authedUser, qid, answer) {
    return {
        type: ANSWER_QUESTION_USER,
        authedUser,
        qid,
        answer,
    };
}