class OrdersController < ApplicationController
  def index
  end

  def show
    @order = Order.find_by(code: params[:id]) || Order.find(params[:id])
  end

  def new
    @order = Order.new
  end

  def create
    @order = Order.create(order_params.to_hash)
    redirect_to order_path(@order)
  end

  private

  def order_params
    params.require(:order).permit(:city_id, :user_id, :address_id, :product_id, sender: [:name, :phone], receiver: [:name, :phone])
  end
end
