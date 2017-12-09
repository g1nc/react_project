require 'faker'

FactoryBot.define do
  factory :product do
    user
    name 'test_product'
    price 100
  end
end
