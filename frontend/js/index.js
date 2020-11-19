init();

async function init() {
    const api = await new ApiService (`http://localhost:3000`);
    api.getAllQuestionnaires()
    .then(() => {
        findAndDisplayFeatured()
    })

    mountIndexButton();
    mountHomeButton();
    mountCreateButton();
}

function findAndDisplayFeatured() {
    // find all featured
    const featuredQuestionnaires = Questionnaire.all.filter(questionnaire => (questionnaire.featured === true))  
    // display random from featured  
    featuredQuestionnaires[Math.floor(Math.random() * featuredQuestionnaires.length)].displayQuestionnaire()
}

function mountIndexButton() {
    const indexButton = document.querySelector("#index-button");
    indexButton.addEventListener('click', (e) => {
        clearPage();
        Questionnaire.displayQuestionnairesIndex()
    })
}

function mountHomeButton() {
    const homeButton = document.querySelector("#home-button");
    homeButton.addEventListener('click', (e) => {
        clearPage();
        findAndDisplayFeatured()
    })
}

function mountCreateButton() {
    const createButton = document.querySelector("#create-button");
    createButton.addEventListener('click', (e) => {
        clearPage();
        debugger;
    })
}

function clearPage() {
    document.querySelector("body > div").innerHTML = "";
}









