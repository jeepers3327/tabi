defmodule TabiWeb.Plugs.VerifyHeader do
  @behaviour Plug

  import Plug.Conn

  alias Tabi.Token

  @doc false
  def init(opts), do: opts

  @doc false
  def call(conn, _opts) do
    token = fetch_token(get_req_header(conn, "authorization"))

    case Token.verify_token(token) do
      {:ok, payload} ->
        conn
        |> assign(:current_user, payload)
        |> assign(:token, token)

      {:error, _} ->
        conn
    end
  end

  defp fetch_token([]), do: nil

  defp fetch_token([token | _tail]) do
    token
    |> String.replace("Bearer ", "")
    |> String.trim()
  end
end
