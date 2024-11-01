// Ensure you have Stripe.js and Stripe Elements loaded in your HTML
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Stripe.js with your publishable key
  const stripe = Stripe('your_stripe_publishable_key'); // Replace with your actual publishable key
  const elements = stripe.elements();

  // Create a card Element and mount it to the DOM
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  const payButton = document.getElementById('pay-button');
  const form = document.getElementById('payment-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    payButton.disabled = true;

    try {
      // First, create a payment intent on your server
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: 1000 }) // Amount in cents, e.g., $10.00
      });

      const { clientSecret } = await response.json();

      // Confirm the payment on the client side
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Optionally add billing details
            name: document.getElementById('name').value
          }
        }
      });

      if (result.error) {
        // Show error to your customer
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
        payButton.disabled = false;
      } else {
        // Payment succeeded
        console.log('Payment successful', result.paymentIntent);
        // Redirect or show success message
      }
    } catch (error) {
      console.error('Payment error:', error);
      payButton.disabled = false;
    }
  });
});
