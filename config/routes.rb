# frozen_string_literal: true

Rails.application.routes.draw do
  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end
  devise_for :users

  root to: 'orders#new'

  namespace :api, defaults: { format: :json } do
    resources :orders,    only: [:index]
    resources :cities,    only: [:index]
    resources :users,     only: [:index]
    resources :addresses, only: [:index]
    resources :products,  only: [:index]
  end
end
