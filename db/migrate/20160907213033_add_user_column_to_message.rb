class AddUserColumnToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :user, :string
  end
end
