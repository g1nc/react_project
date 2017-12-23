class OrdersController < ApplicationController
  before_action :authenticate_user!, except: [:create]

  def index
    redirect_to root_path unless current_user.admin?

    @orders = Order.includes(:user, :product, :address).all
  end

  def show
  end

  def create
    @order = Order.new(order_params.to_hash)
    return render 'new' unless @order.save
    redirect_to @order
  end

  private

  def order_params
    params.require(:order).permit(:city_id, :user_id, :address_id, :product_id, sender: [:name, :phone], receiver: [:name, :phone])
  end
end
