json.array! @addresses do |address|
  json.id address.id
  json.name address.value
  json.user_id address.user_id
end
