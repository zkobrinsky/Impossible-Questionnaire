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
        let newQuestions = [];

        for (let i = 1; i <= 5; i++) {
            newQuestions.push(this.displayQForms(i))
        }
    
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
        <div class="form-group">
            <input type="text" class="form-control form-control-lg" id="inputResult" placeholder="Result">
            <medium id="inputResultHelp" class="form-text text-muted">What snarky message would you like to display at the end of the questionnaire?</small>
        </div>
        <br>
        ${newQuestions.join("")}
        <button type="button" class="btn btn-outline-primary" id="submit-button">Submit</button>
        </form>
        `)
        this.mountNewSubmitButton()
    }

    static displayQForms(index) {
        return (`
        <div class="form-group">
            <label for="q-content-${index}"><h4>Question ${index}</h4></label><br>
            <input type="text" class="form-control form-control-lg" id="q-content-${index}" placeholder="Enter Your Question">
        </div>
        <div class="form-group correct-answer border border-success">
            <input type="text" class="form-control form-control" id="q-content-${index}-correct-answer" placeholder="Enter the correct answer here">
        </div>
        <div class="form-group border border-danger">
            <input type="text" class="form-control form-control" id="q-content-${index}-answer-1" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group border border-danger">
            <input type="text" class="form-control form-control" id="q-content-${index}-answer-2" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group border border-danger">
            <input type="text" class="form-control form-control" id="q-content-${index}-answer-3" placeholder="Enter an incorrect response here">
        </div>
        <div class="form-group border border-danger">
            <input type="text" class="form-control form-control" id="q-content-${index}-answer-4" placeholder="Enter an incorrect response here">
        </div>
        <br>
        `)
    }

    static mountNewSubmitButton() {
        const button = document.querySelector("#submit-button");
        const api = new ApiService(`http://localhost:3000`);
        let formQuestions;
        let formQuestionnaire;

        button.addEventListener('click', (e) => {
            let forms = Array.prototype.slice.call(e.target.parentElement.childNodes);
            forms = forms.filter(e => {
                if (e.classList) {
                    return e.classList.contains("form-group")
                }
            })

            formQuestions = forms.slice(3)
            formQuestionnaire = forms.slice(0,3)

            const newQ = new Questionnaire({});
                newQ.title = formQuestionnaire[0].firstElementChild.value;
                newQ.description = formQuestionnaire[1].firstElementChild.value;
                newQ.result = formQuestionnaire[2].firstElementChild.value;

            const newQuestions = [(new Question({})), (new Question({})), (new Question({})), (new Question({})), (new Question({}))]

            // converting form fields into objects with correct keys
            let formObjects = formQuestions.map((form) => {
                if (form.firstElementChild.classList.contains("form-control") == false) {
                    let key = "content";
                    let obj = {}
                    obj[key] = form.children[2].value;
                    return obj;
                } else {
                    let key = form.firstElementChild.id.split("q-content-").pop().slice(2).replace("-", "_");
                    let obj = {}
                    obj[key] = form.firstElementChild.value;
                    return obj;
                }
            })
            
            for (let i = 0, n = 0; i < formObjects.length; i++) {
                if (i % 6 == 0) {
                    let answers = Object.assign({}, formObjects[i+1], formObjects[i+2], formObjects[i+3], formObjects[i+4], formObjects[i+5])
                    Object.assign(newQuestions[n].answers, answers)
                    Object.assign(newQuestions[n], formObjects[i])
                }
            }
            newQ.questions = newQuestions;
        })
    }

    displayQuestionnaireCard() {
        return (`
        <div class="card col-3" style="width: 18rem;" id="q-${this.id}">
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
            ${this.displayQuestions()}`
        )
        const button = document.querySelector("#submit-button")
        button.addEventListener('click', (e) => {
            // add some conditional here for whether or not the form is filled out
            container.innerHTML = 
                `<div class="alert alert-success" role="alert">
                    <h2 class="alert-heading">${this.result}</h2>
                        <hr>
                    <p class="mb-0">Thank you for your input. Your opinion matters to us and has been documented.</p>
                </div>`;
        })
    }

    displayQuestions() {
        // talks to Question class
        return this.questions.map(question => {
            const newQ = new Question(question)
            return newQ.displayQuestion()+(`</br></br>`);
        }).join("")+(`<button type="button" class="btn btn-outline-primary" id="submit-button">Submit</button>`)
        
    }
}
    




