class Api::OrdersController < ApplicationController
  def index
    @orders = Order.includes(:user, :product, :address).all
  end

  def create
    @order = Order.new(order_params)
  end

  def show
    @order = Order.find(params[:id])
  end

  private

  def order_params
    params.require(:order).permit(:city_id, :address_id, :product_id, :sender, :receiver, :status)
  end
end
