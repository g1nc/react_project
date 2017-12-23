# frozen_string_literal: true

Rails.application.routes.draw do
  scope :auth do
    get :signed_in, to: 'auth#signed_in?'
  end

  resources :orders, only: %i[index show]

  devise_for :users
  get :users, to: 'users#index'

  root to: 'orders#new'

  namespace :api, defaults: { format: :json } do
    resources :orders
    resources :cities,    only: [:index]
    resources :users,     only: [:index]
    resources :addresses, only: [:index]
    resources :products,  only: [:index]
  end
end
