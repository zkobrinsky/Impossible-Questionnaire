class AddResultToQuestionnaires < ActiveRecord::Migration[6.0]
  def change
    add_column :questionnaires, :result, :string
  end
end
