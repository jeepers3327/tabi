defmodule Tabi.Repo do
  use Ecto.Repo,
    otp_app: :tabi,
    adapter: Ecto.Adapters.Postgres
end
