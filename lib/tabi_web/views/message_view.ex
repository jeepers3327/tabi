defmodule TabiWeb.MessageView do
  use TabiWeb, :view

  alias TabiWeb.MessageView

  def render("messages.json", %{messages: messages}) do
    render_many(messages, MessageView, "message.json")
  end

  def render("message.json", %{message: message}) do
    %{id: message.id, nickname: message.user.nickname, message: message.message}
  end

  def render("new_message.json", %{user: user, message: message}) do
    %{id: message.id, nickname: user.nickname, message: message.message}
  end
end
