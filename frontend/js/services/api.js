class ApiService {

    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }


    getAllQuestionnaires() {
        return fetch(`${this.baseUrl}/questionnaires`)
        .then(resp => resp.json())
        .then(q => {
            // debugger;
            q.forEach(questionnaire => {
                
                debugger;
            //     // fix on the back end
            //     new Questionnaire(questionnaire)
            })
        })
    }

    submitNewQuestionnaire(obj) {
        const nestedObj = {questionnaire: obj}
        fetch(`${this.baseUrl}/questionnaires`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify(nestedObj)
        })
        .then(resp => resp.json())
        .then(e => {
            obj.id = e.id;
            obj.questions.forEach((o, index) => {
                o.id = e.questions[index].id
            })
            obj.displayQuestionnaire()
        })

    }

}

    

