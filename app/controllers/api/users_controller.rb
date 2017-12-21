class Api::UsersController < ApplicationController
  def index
    return [] unless params[:city_id]
    @users = User.where(city_id: params[:city_id])
  end
end
