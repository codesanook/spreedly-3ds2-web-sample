require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'rails/test_unit/railtie'

Bundler.require(*Rails.groups)

Dotenv::Railtie.load if defined?(Dotenv)

module Backend
  class Application < Rails::Application
    config.load_defaults 6.0

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'
        resource '*', headers: :any, methods: %i[get post put delete options]
      end
    end

    config.hosts << 'backend.test'
    config.api_only = true
  end
end
