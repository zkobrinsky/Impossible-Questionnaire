init();


function init() {
    const api = new ApiService(`http://localhost:3000`);
    api.getAllQuestionnaires()
    .then(() => {
        displayFeatured()
    })

    mountIndexButton();
    mountHomeButton();
    mountCreateButton();
    mountFeaturedDropdown();
    mountSearchBar();
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

function mountSearchBar() {
    const button = document.querySelector("#navbarSupportedContent > form > button")

    button.addEventListener('click', (e) => {
        let value = e.target.parentElement.querySelector(".form-control").value;
            Questionnaire.searchQuestionnaires(value);
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

function animateWrongAnswers() {
    const wrongAnswers = document.querySelectorAll(".input-group[answertype=wrong]")

    wrongAnswers.forEach(answer => {
        answer.querySelector(".input-group-text").addEventListener('click', e => {
            e.target.checked = false;
        })
        
        answer.addEventListener('mouseover', e => {

            let targetDiv = e.target.closest(".input-group") ? e.target.closest(".input-group") : e.target.parentElement.closest(".input-group")
            // let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            // let randomCoord = Math.random() * 200 * plusOrMinus;
            // debugger;
            const correctItem = document.querySelector("#"+e.target.parentElement.id.split("-").slice(0,2).join("-")+"-correct_answer");    
            const correctCoords = correctItem.getBoundingClientRect();
            const targetCoords = targetDiv.getBoundingClientRect();

            // targetDiv.style.left = `${randomCoord}px`;
            // targetDiv.style.top = "40px";
            targetDiv.style.top = `${(targetCoords.y - correctCoords.y)*1.1}px`;

            setInterval(function() {
                resetCoords(e);
            }, 5000);

            function resetCoords(e) {
                targetDiv.style.left = "0px";
                targetDiv.style.top = "0px";
            }
        })
    })
        
}










