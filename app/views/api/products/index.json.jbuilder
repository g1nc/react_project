json.array! @products do |product|
  json.(product, :id, :name, :user_id)
end
