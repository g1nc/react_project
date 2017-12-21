class Api::CitiesController < ApplicationController
  def index
    @cities = City.order(:id).all
  end
end
