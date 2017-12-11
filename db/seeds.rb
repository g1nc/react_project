require 'faker'

Order.delete_all
Address.delete_all
Product.delete_all
User.delete_all
City.delete_all

5.times do |i|
  city = City.create(name: Faker::Address.city)
  5.times do |j|
    name  = Faker::Name.name
    email = "test#{i}#{j}@test.test"
    user = User.create(name: name, email: email, password: 'test123', city: city)
    2.times do
      Address.create(user: user, value: Faker::Address.street_address)
    end
    4.times do |k|
      Product.create(user: user, name: Faker::Lorem.word, price: (k + 1) * 100)
    end
  end
end
