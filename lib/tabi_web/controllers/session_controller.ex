defmodule TabiWeb.SessionController do
  use TabiWeb, :controller

  def index(conn, _params) do
    conn
    |> put_status(:ok)
    |> render("user.json", user: conn.assigns.current_user)
  end

  def delete(conn, _params) do
    conn
    |> clear_session()
    |> configure_session(drop: true)
    |> send_resp(:no_content, "")
  end
end
