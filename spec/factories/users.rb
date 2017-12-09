require 'faker'

FactoryBot.define do
  factory :user do
    email
    city     { create(:city) }
    name     Faker::Name.name
    role     User::ROLE_SUPPLIER
    password 'test_password'
  end

  sequence(:email) do |n|
    "person#{n}@example.com"
  end
end
