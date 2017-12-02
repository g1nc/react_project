require 'faker'

Quote.delete_all
5.times do |_i|
  Quote.create!(text:   Faker::Simpsons.quote,
                author: Faker::Simpsons.character)
end
puts 'Quotes seeded!'
