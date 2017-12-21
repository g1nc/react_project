json.array! @orders do |order|
  json.(order, :id, :sender, :receiver, :code)
  json.status   order.status_hash[:name]
  json.supplier order.user.name
  json.address  order.address.value
  json.product  order.product.name
end
