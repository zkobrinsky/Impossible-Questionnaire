class QuestionnairesController < ApplicationController
    def index
        questionnaires = Questionnaire.order(updated_at: :desc)
        render :json => questionnaires, :include => {:questions => {:except => [:created_at, :updated_at]}}
    end

    def show
        questionnaire = Questionnaire.find_by(id: params[:id])
        render :json => questionnaire, :include => {:questions => {:except => [:created_at, :updated_at]}}
    end

    def create
        questionnaire = Questionnaire.new(questionnaire_params)

        question_params[:questions].each do |question|
            q = Question.new(content: question[:content])
            q.assign_attributes(question[:answers])
            q.questionnaire = questionnaire
            q.save
        end
        render :json => questionnaire, :include => {:questions => {:except => [:created_at, :updated_at]}}
    end
end

private 
        
        def questionnaire_params
            params.require(:questionnaire).permit(:title, :result, :description)
        end

        def question_params
            params.require(:questionnaire).permit(questions: [
                :content,
                answers: [
                    :correct_answer,
                    :answer_1,
                    :answer_2, 
                    :answer_3,
                    :answer_4
                ]
            ])
        end
