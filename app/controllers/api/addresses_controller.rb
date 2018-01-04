class Api::AddressesController < ApplicationController
  def index
    @addresses = Address.all
  end
end
