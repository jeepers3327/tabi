defmodule TabiWeb.RegistrationController do
  use TabiWeb, :controller

  alias Tabi.Accounts
  alias Tabi.Token

  action_fallback TabiWeb.FallbackController

  def create(conn, params) do
    with {:ok, user} <- Accounts.create_user(params),
         token <- Token.generate_token(user) do
      conn
      |> put_status(:created)
      |> render("user.json", user: user, token: token)
    end
  end
end
