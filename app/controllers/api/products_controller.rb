class Api::ProductsController < ApplicationController
  def index
    return [] unless params[:user_id]
    @products = Product.where(user_id: params[:user_id])
  end
end
