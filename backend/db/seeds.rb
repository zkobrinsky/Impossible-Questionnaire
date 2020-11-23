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
# needs at least one featured to display main page
# Questionnaire.last.update(featured: true)
Questionnaire.first.update(featured: true)

# Create featured Trump questionnaire

trumpObj = {
    title: "Donald J. Trump Performance Review",
    description: "Take this survey to provide feedback on our outgoing president. 
    Your input will be provided to the NSA.",
    result: "We're so pleased to hear you were happy with Mr. Trump. 
    We agree that he is the most tremendous president of all time. 
    Your loyalty has been noted.",
    featured: true
}

q1 = {
    content: "How do you feel about his handling of racial tensions in the U.S.?",
    answer_1: "I mean, he was pretty racist himself...",
    answer_2: "You're really not going to denounce white supremacy?",
    answer_3: "Could've been better.",
    answer_4: "Impartial.",
    correct_answer: "No one is less racist than Donald J. Trump. Not even Lincoln."
}

q2 = {
    content: "How do you feel about Mr. Trump's wall?",
    answer_1: "What wall?",
    answer_2: "Another failed promise that shouldn't have been made to begin with.",
    answer_3: "Kind of a let down.",
    answer_4: "I'm impartial.",
    correct_answer: "It would've been TREMENDOUS if the COMMUNIST DEMOCRATS hadn't SABOTAGED it."
}

q3 = {
    content: "What are your thoughts on Donald Trump as a lover?",
    answer_1: "What kind of survey is this?",
    answer_2: "Gross.",
    answer_3: "Probably not.",
    answer_4: "Not my type.",
    correct_answer: "It would be a tremendous honor to be with the finest president of all time."
}

q4 = {
    content: "Did Mr. Trump do a good job handling COVID-19?",
    answer_1: "Absolutely not. His ignorance and stubbornness cost a lot of lives.",
    answer_2: "It was fine.",
    answer_3: "Could've been better.",
    answer_4: "Looking forward to having a new leader to get this under control.",
    correct_answer: "It's a hoax. But even if it wasn't a hoax, he conquered the shit out of it. Go Proud Boys."
}

q5 = {
    content: "Was banning Muslims from entry to the U.S. a good idea?",
    answer_1: "It goes against everything our country was founded upon.",
    answer_2: "No.",
    answer_3: "I'm impartial.",
    answer_4: "It was xenophobic, racist, and immoral.",
    correct_answer: "They're all terrorists. Let's keep fighting to keep them out. Good job, Don!"
}

qObjs = [q1, q2, q3, q4, q5]

trumpQ = Questionnaire.create(trumpObj)

qObjs.each do |q|
    question = Question.new(q)
    question.questionnaire = trumpQ
    question.save
end

trumpQ.save




