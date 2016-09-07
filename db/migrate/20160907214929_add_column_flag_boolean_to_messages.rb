class AddColumnFlagBooleanToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :flag, :boolean
  end
end
