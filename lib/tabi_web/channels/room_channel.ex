defmodule TabiWeb.RoomChannel do
  use TabiWeb, :channel
  alias TabiWeb.Presence

  alias TabiWeb.MessageView

  alias Tabi.Chat
  alias Tabi.Accounts

  @impl true
  def join("room:lobby", %{"id" => id}, socket) do
    send(self(), :after_join)

    {:ok, assign(socket, user_id: id)}
  end

  @impl true
  def handle_info(:after_join, socket) do
    user = Accounts.get_user!(socket.assigns.user_id)

    {:ok, _} =
      Presence.track(socket, user.id, %{
        id: user.id,
        nickname: user.nickname,
        online_at: inspect(System.system_time(:second))
      })

    messages = MessageView.render("messages.json", %{messages: Chat.list_messages()})

    push(socket, "presence_state", Presence.list(socket))
    push(socket, "list_messages", %{messages: messages})

    {:noreply, assign(socket, :user, user)}
  end

  @impl true
  def handle_in("create_message", payload, socket) do
    {:ok, message} = Chat.create_message(socket.assigns.user, payload)

    message =
      MessageView.render("new_message.json", %{user: socket.assigns.user, message: message})

    broadcast(socket, "message_created", message)
    {:noreply, socket}
  end
end
