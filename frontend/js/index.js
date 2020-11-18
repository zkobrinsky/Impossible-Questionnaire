

const wrongAnswers = document.querySelectorAll("#radio");
const rightAnswers = document.querySelector("#correct_answer");

wrongAnswers.forEach(answer => {
    answer.addEventListener('mouseenter', event => {
        // debugger;
    })
})

const api = new ApiService (`http://localhost:3000`)
.getAllQuestionnaires()



