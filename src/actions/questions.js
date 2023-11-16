import { createQuestionUser, answerQuestionUser } from "./users"; 
import { saveQuestion, saveQuestionAnswer } from "../utils/API";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const CREATE_QUESTION = "CREATE_QUESTION";
export const QUESTIONS_NEED_TO_ANSWER = "QUESTIONS_NEED_TO_ANSWER";
export const CREATE_ANSWER_TO_QUESTION = "CREATE_ANSWER_TO_QUESTION";


export function needAnsweringQuestions(questions) {
    return {
        type: QUESTIONS_NEED_TO_ANSWER,
        questions,
    };
}

export function createNewQuestion(question) {
    return {
        type: CREATE_QUESTION,
        question,
    };
}

export function createAnswerToQuestion(author, qid, answer) {
    return {
        type: CREATE_ANSWER_TO_QUESTION,
        author,
        qid,
        answer,
    };
}

export function handleCreateAnswer(questionId, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer(authedUser.id, questionId, answer)
            .then(() => {
                dispatch(answerQuestionUser(authedUser.id, questionId, answer));
                dispatch(createAnswerToQuestion(authedUser.id, questionId, answer));
            });
    }
}

export function handleCreateQuestion(firstOption, secondOption, authedUser) {
    return (dispatch, getState) => {
        // const { authedUser } = getState();
        dispatch(showLoading());
        return saveQuestion(
            firstOption,
            secondOption,
            authedUser,
        )
          .then((question) => {
            dispatch(createNewQuestion(question));
            dispatch(createQuestionUser(question));
          })
          .then(() => dispatch(hideLoading()));
      };
}

