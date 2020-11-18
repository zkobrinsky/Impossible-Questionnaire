init();

async function init() {
    const api = await new ApiService (`http://localhost:3000`);
    api.getAllQuestionnaires()
    .then(() => {
        Questionnaire.all[2].displayQuestionnaire()
    })
    console.log(questionnaires[2])
    // questionnaires[2].displayQuestionnaire()
    // debugger;
}










