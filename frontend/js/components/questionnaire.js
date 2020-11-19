class Questionnaire {

    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.result = obj.result;
        this.featured = obj.featured;
        this.questions = obj.questions;
        this.description = obj.description;
        Questionnaire.all.push(this)
    }

    static all = [];

    static displayQuestionnairesIndex() {
        const container = document.querySelector("body > div");
            
        container.innerHTML = this.all.map(q => {
            return q.displayQuestionnaireCard()
        }).join("")
        this.mountCardButtons()
    }

    static mountCardButtons() {
        const cards = document.querySelectorAll(".card");

        for (const card of cards) {
            card.addEventListener('click', (e) => {
                const q = Questionnaire.all.find(questionnaire => questionnaire.id === parseInt(card.id.slice(2)))
                q.displayQuestionnaire();
            })
        }
    }

    displayQuestionnaireCard() {
        return (`
        <div class="card" style="width: 18rem;" id="q-${this.id}">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${this.description}</h6>
          </div>
        </div>
        `)
    }


    displayQuestionnaire() {
        const container = document.querySelector("body > div");
            
        container.innerHTML = (
            `<h1 class="title" id="q-${this.id}-title">${this.title}</h1>
            <h3 class="description" id="q-${this.id}-description">${this.description}</h3></br>
            ${this.displayQuestions()}
            <button type="button" class="btn btn-outline-primary" id="submit-button">Submit</button>`
        )
        const button = document.querySelector("#submit-button")
        button.addEventListener('click', (e) => {
            debugger
        })
    }

    displayQuestions() {
        // talks to Question class
        return this.questions.map(question => {
            const newQ = new Question(question)
            return newQ.displayQuestion()+("</br></br>");
            // debugger
        }).join("")
        
    }
}
    




