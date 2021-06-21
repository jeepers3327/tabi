defmodule Tabi.Token do
  @namespace "tabi chat app"

  def generate_token(user) do
    Phoenix.Token.sign(TabiWeb.Endpoint, @namespace, %{id: user.id, nickname: user.nickname})
  end

  def verify_token(token) do
    Phoenix.Token.verify(TabiWeb.Endpoint, @namespace, token)
  end
end
