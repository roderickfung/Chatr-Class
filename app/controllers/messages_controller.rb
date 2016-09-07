class MessagesController < ApplicationController

  def index
    render json: Message.all
  end

  def create
    Message.create!(user: params[:user], body: params[:body], flag: params[:flag])
    head :created
  end

  def update
    message = Message.find params[:id]
    if message.flag
      message.update(flag: false)
    else
      message.update(flag: true)
    end
    head :ok
  end

  def destroy
    Message.find(params[:id]).destroy!
    head :ok
  end

end
