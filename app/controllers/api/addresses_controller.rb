class Api::AddressesController < ApplicationController
  def index
    return [] unless params[:user_id]
    @addresses = Address.where(user_id: params[:user_id])
  end
end
