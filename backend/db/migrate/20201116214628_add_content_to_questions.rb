class AddContentToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :content, :string
  end
end
