class ApiService{

    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }


    getAllQuestionnaires() {
        fetch(`${this.baseUrl}/questionnaires`)
        .then(resp => resp.json())
        .then(obj => {
            // debugger
        })
    }

}

