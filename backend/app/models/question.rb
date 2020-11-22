class Question < ApplicationRecord
    belongs_to :questionnaire

    def answers
        [
        self.answer_1,
        self.answer_2,
        self.answer_3,
        self.answer_4,
        self.correct_answer
        ]  
    end

end
