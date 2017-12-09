require 'faker'

City.delete_all
5.times { City.create(name: Faker::Address.city) }

User.delete_all
City.all.each do |city|
  5.times do |i|
    name  = Faker::Name.name
    email = "test#{i}@test.test"
    User.create(name: name, email: email, password: 'test123', city: city)
  end
end

Address.delete_all
Product.delete_all
User.all.each do |user|
  2.times do
    Address.create(user: user, value: Faker::Address.street_address)
  end
  4.times do |i|
    name = Faker::RickAndMorty.quote
    Product.create(user: user, name: name, price: (i + 1) * 100)
  end
end
