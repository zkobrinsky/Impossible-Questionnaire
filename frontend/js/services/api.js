class ApiService {

    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }


    getAllQuestionnaires() {
        fetch(`${this.baseUrl}/questionnaires`)
        .then(resp => resp.json())
        .then(q => {
            q.forEach(questionnaire => {
                let newQ = new Questionnaire(questionnaire)
                questionnaires.push(newQ)
            })
            
        })
    }

}

