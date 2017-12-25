class Api::UsersController < ApplicationController
  def index
    @users = User.where(role: 'supplier').all
    @users = @users.where(city_id: params[:city_id]) if params[:city_id]
  end
end
