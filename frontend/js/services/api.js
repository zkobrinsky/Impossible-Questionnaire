class ApiService {

    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }


    getAllQuestionnaires() {
        return fetch(`${this.baseUrl}/questionnaires`)
        .then(resp => resp.json())
        .then(q => {
            q.forEach(questionnaire => {
                new Questionnaire(questionnaire)
            })
        })
    }

}

