class Question {
    constructor (obj) {
        this.id = obj.id;
        this.content = obj.content;
        this.answers = {
            answer_1: obj.answer_1,
            answer_2: obj.answer_2,
            answer_3: obj.answer_3,
            answer_4: obj.answer_4, 
            correct_answer: obj.correct_answer
        }
    }

    displayQuestion() {
        let answers = this.htmlifyAnswers();
            // Fisher and Yates' Shuffle to randomize order
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = answers[i]
                answers[i] = answers[j]
                answers[j] = temp
              }

            return `<h5>${this.content}</h3>${answers.join("")}`
        }

        htmlifyAnswers() {
            let fields = [];
            for(const answer in this.answers) {
                if (answer != "correct_answer") {
                fields.push(
                    `<div class="input-group" id="q-${this.id}-${answer}" answertype='wrong'>
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="radio" aria-label="Radio button for following text input" name="check${this.id}">
                            </div>
                        </div>
                        <input disabled type="text" class="form-control" id="input-field" aria-label="Text input with radio button" value='${this.answers[answer]}'>
                    </div>
                    </br>`
                    )
                } else {
                    fields.push(
                        `<div class="input-group" id="q-${this.id}-${answer}" answertype='correct'>
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="radio" aria-label="Radio button for following text input">
                                </div>
                            </div>
                            <input type="text" class="form-control" id="input-field" aria-label="Text input with radio button" value='${this.answers[answer]}'>
                        </div>
                        </br>`
                    )
                }
            }
            return fields;


        }
        

}
