Rails.application.routes.draw do
  post '/purchase' => 'transactions#purchase'
  get '/transactions/:token' => 'transactions#show'
  post '/complete/:token' => 'transactions#complete'
  get '/redirect/:transaction_token' => 'transactions#redirect'
  get '/redirect' => 'transactions#redirect'
  post '/callback/:transaction_token' => 'transactions#callback'
  post '/callback' => 'transactions#callback'
end
