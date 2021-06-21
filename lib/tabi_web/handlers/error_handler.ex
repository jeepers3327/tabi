defmodule TabiWeb.Handlers.ErrorHandler do
  use TabiWeb, :controller

  def call(conn, :unauthenticated) do
    conn
    |> put_status(401)
    |> json(%{error: %{code: 401, message: "Please sign in first!"}})
  end
end
