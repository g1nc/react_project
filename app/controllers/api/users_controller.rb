class Api::UsersController < ApplicationController
  def index
    @users = User.all
    @users = @users.where(city_id: params[:city_id]) if params[:city_id]
  end
end
