class AddFeaturedToQuestionnaires < ActiveRecord::Migration[6.0]
  def change
    add_column :questionnaires, :featured, :boolean, default: false
  end
end
