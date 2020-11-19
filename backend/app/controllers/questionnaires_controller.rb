class QuestionnairesController < ApplicationController
    def index
        questionnaires = Questionnaire.order(updated_at: :desc)
        render :json => questionnaires, :include => {:questions => {:except => [:created_at, :updated_at]}}
    end

    def show
        questionnaire = Questionnaire.find_by(id: params[:id])
        render :json => questionnaire, :include => {:questions => {:except => [:created_at, :updated_at]}}
    end
end
