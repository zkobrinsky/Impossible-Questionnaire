class QuestionsController < ApplicationController
    def index
        questions = Question.all
        render :json => questions, :include => :questionnaire
    end

    def show
        question = Question.find_by(id: params[:id])
        render :json => question, :include => :questionnaire
    end
end
