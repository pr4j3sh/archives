class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  def get
    render json:{message:"online"}
  end

  def post
    body = params.require(:api)
    render json:{message:"create",body: body}
  end

  def put
    id = params[:id]
    body = params.require(:api)
    render json:{message:"update",body: body, id: id}
  end

  def delete
    id = params[:id]
    render json:{message:"delete", id: id}
  end
end
