class Api::OrdersController < ApplicationController
  def index
    @orders = Order.includes(:user, :product, :address).all
  end
end
