json.array! @cities do |city|
  json.(city, :id, :name)
end
