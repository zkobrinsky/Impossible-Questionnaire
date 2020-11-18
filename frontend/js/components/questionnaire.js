class Questionnaire {
    static displayQuestionnaires() {
        // debugger;
    }

    static all = [];

    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.result = obj.result;
        this.featured = obj.featured;
        this.questions = obj.questions;
        Questionnaire.all.push(this)
    }

    displayQuestionnaire() {
        const container = document.querySelector("body > div");
            
        container.innerHTML = (
            `<h1 id="change-this">${this.title}</h1></br>
            ${this.displayQuestions()}`
        )
        // add a submit button to innerHTML as well
    }

    displayQuestions() {
        return this.questions.map(question => {
            const newQ = new Question(question)
            return newQ.displayQuestion()+("</br></br>");
            // debugger
        }).join("")
        
    }
}
    




