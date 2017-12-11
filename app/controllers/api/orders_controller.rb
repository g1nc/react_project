class Api::OrdersController < ApplicationController
  def index
  end

  def create
  end

  def show
    @order = Order.find(params[:code] || params[:id])
  end
end
