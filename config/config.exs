# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :tabi,
  ecto_repos: [Tabi.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :tabi, TabiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TjUiSWU1OuWUDJcBPC9vO9fOX4EfcmEP0jWlCOcQtkvrG5tvo7/Vc28eGQptqQSW",
  render_errors: [view: TabiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Tabi.PubSub,
  live_view: [signing_salt: "xVvufaQA"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configure CORS
config :cors_plug,
  origin: ["http://localhost:3000"],
  max_age: 86400,
  methods: ["GET", "POST", "DELETE"]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
