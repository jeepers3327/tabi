defmodule Tabi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Tabi.Repo,
      # Start the Telemetry supervisor
      TabiWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Tabi.PubSub},
      # Start the Endpoint (http/https)
      TabiWeb.Endpoint
      # Start a worker by calling: Tabi.Worker.start_link(arg)
      # {Tabi.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Tabi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    TabiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
