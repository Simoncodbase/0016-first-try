# Accept a Payment with Stripe Checkout

Stripe Checkout is the fastest way to get started with payments. Included are some basic build and run scripts you can use to start up the application.

## Set Price ID

In the back end code, replace `price_1QCkQHEAbBnxrSl52wLwHQhp` with a Price ID (`price_xxx`) that you created.

## Running the sample

1. Build the server

~~~
mvn package
~~~

2. Run the server

~~~
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
~~~

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)