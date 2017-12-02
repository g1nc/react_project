require 'faker'

FactoryBot.define do
  factory :quote do
    text   Faker::Simpsons.quote
    author Faker::Simpsons.character
  end
end