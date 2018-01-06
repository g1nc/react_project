require 'faker'

Order.delete_all
Address.delete_all
Product.delete_all
User.delete_all
City.delete_all

products = %w[Эспрессо Американо Латте Чай]
cities = [
  {
    name: 'Севастополь',
    suppliers: ['Кафе "3 пескаря"', 'Кофе дизлайк', 'Starfax coffee']
  },
  {
    name: 'Симферополь',
    suppliers: ['Coffee enemy', 'Bakhchisaray coffee', 'Кафе "Люста"']
  }
]

cities.each do |c|
  city = City.create(name: c[:name])
  c[:suppliers].each_with_index do |supplier, index|
    email = Faker::Internet.email
    user = User.create(name: supplier, email: email, password: 'test123', city: city)
    Address.create(user: user, value: Faker::Address.street_address)
    products.each do |product|
      Product.create(user: user, name: product, price: 100)
    end
  end
end