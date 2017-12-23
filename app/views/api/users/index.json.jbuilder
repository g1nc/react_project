json.array! @users do |user|
  json.(user, :id, :name, :email)
  json.orders user.orders.count
end
