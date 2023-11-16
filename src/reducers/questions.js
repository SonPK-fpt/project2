import { CREATE_QUESTION, CREATE_ANSWER_TO_QUESTION, QUESTIONS_NEED_TO_ANSWER } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case QUESTIONS_NEED_TO_ANSWER:
            return {
                ...state,
                ...action.questions,
            };
        case CREATE_ANSWER_TO_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat(action.author)
                    }
                }
            };
        case CREATE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };

        default:
            return state;
    }
}
