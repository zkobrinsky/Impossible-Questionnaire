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
            
        container.innerHTML = `<div class="row">${this.all.map(q => {
            return q.displayQuestionnaireCard()
        }).join("")}</div>`
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

    static mountCreateForm() {
        const container = document.querySelector("body > div");
        container.innerHTML = (`
        <h1 class ="title">Create a New Questionnaire</h1>
        <br>
        <h3 class="subhead">Unlike most questionnaires, here there <strong>are</strong> incorrect answers. Make sure your friends know what's what.</h3>
        <br>
        <form>
        <div class="form-group">
            <input type="text" class="form-control form-control-lg" id="inputTitle" placeholder="Questionnaire Title">
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control-lg" id="inputDescription" placeholder="Description">
        </div>
        <br>
        <div class="form-group">
            <label for="q-content-1"><h4>Question 1</h4></label><br>
            <input type="text" class="form-control form-control-lg" id="q-content-1" placeholder="Enter Your Question">
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control" id="q-content-1-answer-1" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control" id="q-content-1-answer-2" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control" id="q-content-1-answer-3" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control" id="q-content-1-answer-4" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group correct-answer">
            <input type="text" class="form-control form-control" id="q-content-1-correct-answer" placeholder="Enter the correct answer here">
        </div>
        </form>
        
        `)
        // debugger
        // title form
        // description form
        // Create 5 Question Forms from Question Class
        // Submit Button
    }

    displayQuestionnaireCard() {
        return (`
        <div class="card col-4" style="width: 18rem;" id="q-${this.id}">
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
        }).join("")
        
    }
}
    




