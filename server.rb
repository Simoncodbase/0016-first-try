require 'stripe'
require 'sinatra'

# This is your test secret API key.
Stripe.api_key = 'sk_test_51Q9TrZEAbBnxrSl5bifc8VeL3x7jUlRkbmB7SMQp2a4cePgXmUTrDtXyIvSI7CurRDH8EaXAqMLMqdf3jOBnruzr00aOA2JW4e'

set :static, true
set :port, 4242

YOUR_DOMAIN = 'https://giftbitcoin.netlify.app'

post '/create-checkout-session' do
  content_type 'application/json'

  session = Stripe::Checkout::Session.create({
    line_items: [{
      # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
      price: 'price_1QCkQHEAbBnxrSl52wLwHQhp',
      quantity: 1,
    }],
    mode: 'payment',
    success_url: YOUR_DOMAIN + '/success.html',
    cancel_url: YOUR_DOMAIN + '/cancel.html',
  })
  redirect session.url, 303
end
