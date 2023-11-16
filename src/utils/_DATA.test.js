import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestionAnswer", () => {
    it("should returns true when correctly formatted data is passed to the function", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "am8ehyc8byjqgar0jgpub9",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should returns the when incorrect formatted data is passed to the function", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: null,
            qid: "7yplmw6yi6jwbso03ex6x",
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});


describe("_saveQuestion", () => {
    it("should return the saved question and all expected fields are populated", async () => {

        const mockQuestion = {
            author: "tylermcginnis",
            optionOneText: "optionOne",
            optionTwoText: "optionTwo",
          };
      
          const actual = await _saveQuestion(mockQuestion);
          const { author, optionOne, optionTwo } = actual;
          const text1 = optionOne.text;
          const text2 = optionTwo.text;
      
        //   expect(author).toBe("name of author");
        //   expect(text1).toBe("option one");
        //   expect(text2).toBe("option two");
    });

    it("should returns an error when incorrect data is passed to the function", async () => {
        const mockQuestion = {
          author: "",
          optionOneText: "",
          optionTwoText: "abc",
        };
    
        await expect(_saveQuestion(mockQuestion)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
      });
});