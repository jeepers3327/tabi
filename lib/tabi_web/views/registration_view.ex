defmodule TabiWeb.RegistrationView do
  use TabiWeb, :view

  def render("user.json", %{user: user, token: token}) do
    %{id: user.id, nickname: user.nickname, token: token}
  end
end
