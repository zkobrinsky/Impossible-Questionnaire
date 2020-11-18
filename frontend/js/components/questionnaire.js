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
        this.description = obj.description;
        Questionnaire.all.push(this)
    }

    displayQuestionnaire() {
        const container = document.querySelector("body > div");
            
        container.innerHTML = (
            `<h1 class="title" id="q-${this.id}-title">${this.title}</h1>
            <h3 class="description" id="q-${this.id}-description">${this.description}</h3></br>
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
    




