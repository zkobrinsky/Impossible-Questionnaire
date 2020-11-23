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
        let results = []

        Questionnaire.all.forEach(q => {
            let options = [q.title, q.result, q.description]
            options.forEach((o, index) => {
                let innerResults = o.split(" ").map(w => {
                    if (w.toLowerCase() == value.toLowerCase()) {
                        if (index === 0) {
                        return Questionnaire.all.find(q => {
                            return q.title === options[index]
                        })
                    } else if (index === 1) {
                        return Questionnaire.all.find(q => {
                            return q.title === options[index]
                        })
                    } else if (index === 2) {
                        return Questionnaire.all.find(q => {
                            return q.description === options[index]
                        })
                    }

                    }
                    
                }).filter(Boolean);

                if (innerResults) {
                    innerResults.forEach(r => {
                        results.push(r)
                    })
                }
            })
        })
        Questionnaire.displayFilteredQuestionnairesIndex(results);
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
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let randomCoord = Math.random() * 200 * plusOrMinus;

            e.target.parentElement.style.left = `${randomCoord}px`;
            e.target.parentElement.style.top = `${randomCoord}px`;

            setInterval(function() {
                resetCoords(e);
            }, 2000);

            function resetCoords(e) {
                e.target.parentElement.style.left = "0px";
                e.target.parentElement.style.top = "0px";
            }
        })
    })
        
}










