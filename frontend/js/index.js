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
    let elements = document.getElementsByClassName('dropdown-item');
    
    dropDown.addEventListener('click', () => {
        const realDropDown = document.querySelector(".dropdown-menu");
        realDropDown.innerHTML = ""
        findFeatured().forEach(q => {
            realDropDown.innerHTML += `<a class="dropdown-item" href="#" id=${q.id}>${q.title}</a>`
        })

        // iterate after dropdown items have been created
        for (let element of elements) {
            element.addEventListener('click', () => {
                let q = Questionnaire.all.find(q => {
                    return q.id == element.id
                })
                q.displayQuestionnaire();
            })
        }
    })
    
}

function displayNewQuestionnaireForm() {
    Questionnaire.mountCreateForm(5)
}

function clearPage() {
    document.querySelector("body > div").innerHTML = "";
}

function findFeatured() {
    return Questionnaire.all.filter(questionnaire => (questionnaire.featured === true))
}









