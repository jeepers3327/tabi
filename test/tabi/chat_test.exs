defmodule Tabi.ChatTest do
  use Tabi.DataCase

  alias Tabi.Chat
  alias Tabi.Accounts

  describe "messages" do
    alias Tabi.Chat.Message

    @valid_user_attrs %{nickname: "some nickname"}
    @valid_attrs %{message: "some message"}
    @update_attrs %{message: "some updated message"}
    @invalid_attrs %{message: nil}

    def message_fixture(user, attrs \\ %{}) do
      attrs =
        attrs
        |> Enum.into(@valid_attrs)

      {:ok, message} =
        user
        |> Chat.create_message(attrs)

      message
    end

    def user_fixture() do
      {:ok, user} = Accounts.create_user(@valid_user_attrs)

      user
    end

    setup do
      user = user_fixture()

      %{user: user}
    end

    test "list_messages/0 returns all messages", %{user: user} do
      message = message_fixture(user)
      assert Chat.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id", %{user: user} do
      message = message_fixture(user)
      assert Chat.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message", %{user: user} do
      assert {:ok, %Message{} = message} = Chat.create_message(user, @valid_attrs)
      assert message.message == "some message"
    end

    test "create_message/1 with invalid data returns error changeset", %{user: user} do
      assert {:error, %Ecto.Changeset{}} = Chat.create_message(user, @invalid_attrs)
    end

    test "update_message/2 with valid data updates the message", %{user: user} do
      message = message_fixture(user)
      assert {:ok, %Message{} = message} = Chat.update_message(message, @update_attrs)
      assert message.message == "some updated message"
    end

    test "update_message/2 with invalid data returns error changeset", %{user: user} do
      message = message_fixture(user)
      assert {:error, %Ecto.Changeset{}} = Chat.update_message(message, @invalid_attrs)
      assert message == Chat.get_message!(message.id)
    end

    test "delete_message/1 deletes the message", %{user: user} do
      message = message_fixture(user)
      assert {:ok, %Message{}} = Chat.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> Chat.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset", %{user: user} do
      message = message_fixture(user)
      assert %Ecto.Changeset{} = Chat.change_message(message)
    end
  end
end
