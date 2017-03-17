Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]
    resources :resorts, only: [:index, :show]
    resources :reviews, only: [:update, :destroy]
  end

  root "static_pages#root"
end
