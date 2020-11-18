init();

function init() {
    const api = new ApiService (`http://localhost:3000`);
    api.getAllQuestionnaires();
    
    // debugger;
    // Questionnaire.displayQuestionnaires();
}






// experimenting with moving radios:
// const wrongAnswers = document.querySelectorAll("#radio");
// const rightAnswers = document.querySelector("#correct_answer");

// wrongAnswers.forEach(answer => {
//     answer.addEventListener('mouseenter', event => {
//         // debugger;
//     })
// })



