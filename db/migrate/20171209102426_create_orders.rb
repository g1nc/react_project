class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.references :user, foreign_key: true
      t.references :address, foreign_key: true
      t.references :product, foreign_key: true
      t.json :sender,   null: false
      t.json :receiver, null: false
      t.string :status, null: false, default: 'waiting'
      t.string :code,   null: false

      t.timestamps
    end
  end
end
