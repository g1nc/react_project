json.array! @users do |user|
  json.(user, :id, :name, :email, :city_id)
  json.orders user.orders.count
end
