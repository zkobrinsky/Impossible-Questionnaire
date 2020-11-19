init();

async function init() {
    const api = await new ApiService (`http://localhost:3000`);
    api.getAllQuestionnaires()
    .then(() => {
        displayFeatured()
    })

    mountIndexButton();
    mountHomeButton();
    mountCreateButton();
    mountFeaturedDropdown();
}

function displayFeatured() {
    const featuredQuestionnaires = findFeatured();
    // display random from featured  
    featuredQuestionnaires[Math.floor(Math.random() * featuredQuestionnaires.length)].displayQuestionnaire()
}

function mountIndexButton() {
    const indexButton = document.querySelector("#index-button");
    indexButton.addEventListener('click', () => {
        clearPage();
        Questionnaire.displayQuestionnairesIndex()
    })
}

function mountHomeButton() {
    const homeButton = document.querySelector("#home-button");
    homeButton.addEventListener('click', () => {
        clearPage();
        displayFeatured()
    })
}

function mountCreateButton() {
    const createButton = document.querySelector("#create-button");
    createButton.addEventListener('click', () => {
        clearPage();
        displayNewQuestionnaireForm()
    })
}

function mountFeaturedDropdown() {
    const dropDown = document.querySelector(".dropdown-toggle");
    dropDown.addEventListener('click', (e) => {
        const realDropDown = document.querySelector(".dropdown-menu")
        // debugger;
        realDropDown.innerHTML = `<a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>`
    })
    
}

function displayNewQuestionnaireForm() {
    Questionnaire.mountCreateForm()
}

function clearPage() {
    document.querySelector("body > div").innerHTML = "";
}

function findFeatured() {
    return Questionnaire.all.filter(questionnaire => (questionnaire.featured === true))
}









