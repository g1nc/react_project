Rails.application.routes.draw do
  devise_for :users

  get 'quotes', to: 'pages#home'

  resources :orders

  root to: 'orders#new'
  namespace :api, defaults: { format: :json } do
    resources :quotes, only: [:show]
    resources :orders
  end
end
