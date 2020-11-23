class ApiService {

    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }


    getAllQuestionnaires() {
        return fetch(`${this.baseUrl}/questionnaires`)
        .then(resp => resp.json())
        .then(questionnaire => {
            questionnaire.forEach(e => {
            const newQs = e.questions.map(q => {
                return new Question(q);
            })
            const bigQ = new Questionnaire({
                id: e.id,
                title: e.title,
                result: e.result,
                featured: e.featured,
                questions: newQs,
                description: e.description,
                content: e.content,
            })
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
            const newQs = e.questions.map(q => {
                return new Question(q);
            })
            
            Object.assign(obj, {
                id: e.id,
                title: e.title,
                result: e.result,
                featured: e.featured,
                questions: newQs,
                description: e.description,
                content: e.content,
            })

            obj.displayQuestionnaire()
        })

    }

}

    

