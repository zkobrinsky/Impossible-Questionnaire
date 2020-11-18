# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Question.destroy_all
Questionnaire.destroy_all



5.times do 
    questionnaire = Questionnaire.create(title: Faker::Company.bs.titleize, result: Faker::ChuckNorris.fact, description: Faker::ChuckNorris.fact)

    5.times do
        questionData = {
            content: Faker::ChuckNorris.fact.gsub(".", "?"),
            answer_1: Faker::ChuckNorris.fact,
            answer_2: Faker::ChuckNorris.fact,
            answer_3: Faker::ChuckNorris.fact,
            answer_4: Faker::ChuckNorris.fact,
            correct_answer: Faker::ChuckNorris.fact
        }
        q1 = Question.new(questionData)
        q1.questionnaire = questionnaire
        q1.save
    end
    questionnaire.save!
end




