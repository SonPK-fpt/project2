import { getInitialData } from "../utils/API";
import { needAnsweringQuestions } from "./questions"; 
import { receiveUsers } from "./users";

export function handleInitData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            for (const userId in users) {
                if (users.hasOwnProperty(userId)) {
                    const data = localStorage.getItem(userId);
                    if (!data) {
                        localStorage.setItem(`${userId}`, users[userId].questions.length);
                    }
                }
              }
            dispatch(receiveUsers(users));
            dispatch(needAnsweringQuestions(questions));
        })
    }
}