class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.references :user, foreign_key: true
      t.string :name, null: false
      t.numeric :price, null: false

      t.timestamps
    end
  end
end
