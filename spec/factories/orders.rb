require 'faker'

FactoryBot.define do
  factory :order do
    code
    user     { create(:user) }
    address  { create(:address) }
    product  { create(:product) }
    sender   { { name: 'sender_name', phone: 'sender_phone' } }
    receiver { { name: 'receiver_name', phone: 'receiver_phone' } }
    status   Order::STATUS_WAITING
  end

  sequence(:code) do |n|
    "order_code#{n}"
  end
end
