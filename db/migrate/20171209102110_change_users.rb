class ChangeUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :city, foreign_key: true, null: true
    add_column :users, :role, :string, default: 'supplier'
    add_column :users, :name, :string, null: false
  end
end
