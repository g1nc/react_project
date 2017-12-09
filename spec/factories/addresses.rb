require 'faker'

FactoryBot.define do
  factory :address do
    user
    value 'test_address'
  end
end
