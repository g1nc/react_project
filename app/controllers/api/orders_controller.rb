class Api::OrdersController < ApplicationController
  def index
    @orders = Order.includes(:user, :product, :address).all
    @orders = @orders.where(code: params[:code]) if params[:code]
  end

  def create
    @order = Order.new(order_params)
    if @order.save
      @order
    else
      @order.errors
    end
  end

  def show
    @order = Order.find(params[:id])
  end

  private

  def order_params
    params.require(:order).permit(
      :city_id, :user_id, :address_id, :product_id, :status, sender: %i[name phone], receiver: %i[name phone])
  end
end
