json.array! @addresses do |address|
  json.id address.id
  json.name address.value
end
