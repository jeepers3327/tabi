defmodule TabiWeb.Plugs.EnsureAuthenticated do
  @behaviour Plug

  import Plug.Conn

  @doc false
  def init(opts), do: opts

  def call(conn, opts) do
    handler = Keyword.get(opts, :handler)

    case conn.assigns[:current_user] do
      nil ->
        conn
        |> handler.call(:unauthenticated)
        |> halt()

      _ ->
        conn
    end
  end
end
