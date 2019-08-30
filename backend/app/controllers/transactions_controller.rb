class TransactionsController < ApplicationController
  def show
    response = SPREEDLY_CLIENT.find_transaction(transaction_token)

    ap response

    render json: response, status: :ok
  end

  def purchase
    card = SPREEDLY_CLIENT.add_credit_card(transaction_params[:credit_card])
    purchase_attributes = transaction_params.except(:credit_card, :amount)

    ap purchase_attributes

    transaction = SPREEDLY_CLIENT.purchase_on_gateway(
      SPREEDLY_GATEWAY_TOKEN, card.payment_method.token,
      transaction_params[:amount],
      purchase_attributes
    )

    render json: transaction, status: :created
  end

  def complete
    response = SPREEDLY_CLIENT.complete_transaction(transaction_token)

    ap response

    render json: response, status: :ok
  end

  def redirect
    redirect_to "http://localhost:3000?token=#{params[:transaction_token]}"
  end

  def callback
    ap(token: params[:transaction_token], callback: true)

    render json: { ok: true }, status: :ok
  end

  private

  def transaction_params
    # Update .env to set this to your ngrok tunnel
    params.require(:transaction).permit!.merge(
      redirect_url: "#{ENV['BACKEND_HOST']}/redirect",
      callback_url: "#{ENV['BACKEND_HOST']}/callback"
    )
  end

  def transaction_token
    params[:token]
  end
end
