defmodule TabiWeb.SessionView do
  use TabiWeb, :view

  def render("user.json", %{user: user}) do
    %{id: user.id, nickname: user.nickname}
  end
end
