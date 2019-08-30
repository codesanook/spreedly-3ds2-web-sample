# Spreedly 3DS2 Web Sample

This application is intended to demonstrait how to integrate Spreedly 3DS 2 based flows. To use it you'll need to make sure that you have a Spreedly environment setup along with a Spreedly test gateway setup. There are two parts to this application - a frontend application and a backend application. The frontend application is where most of the integration work happens. There are a couple of fields that you'll need to expose from your backend to your frontend to complete the process throughout the transaction process. You can find more information on the [3DS 2 Web based guide](https://docs.spreedly.com/guides/3dsecure2/).

## Getting started

### Backend

The backend application is written in ruby on rails. You'll need to have ruby installed and you'll need to run `bundle install` in the `backend/` folder. You'll also need to copy the `.env.example` file to `.env` and change environment variables to match your environment key and secret along with the test gateway token. Spreedly also needs to be able to reach the backend project (rails application) from the public internet. To do that there is a `BACKEND_HOST` environment variable in the `.env` file that you'll need to set to do so. *note* A good tool for exposing development environments via a tunnel is https://ngrok.com/.

#### Backend Quickstart Checklist

- [ ] have ruby installed
- [ ] bundle install in `backend`
- [ ] create a tunnel using ngrok (or something like it)
- [ ] copy `.env.example` to `.env` 
- [ ] change values in `.env` to match your Spreedly environment and your ngrok tunnel
- [ ] run `bundle exec rails server`

### Frontend

The frontend application is written react to simulate a somewhat real world application. To run the application you'll need to have node and yarn installed on your machine. After they've been installed you'll simply run `yarn install` and then `yarn start`

#### Frontend Quickstart Checklist

- [ ] have node and yarn installed on your system
- [ ] run `yarn install` in the project root
- [ ] run `yarn start` in the project root

### Notice

For simplicity this application creates payment method tokens in the authorize and purchase requests by including the credit card fields in the request. This is not a recommended flow since you'd be taking on a higher PCI scope. In most applications you'll want to use either [Sreedly Express](https://docs.spreedly.com/guides/adding-payment-methods/express/) or [Spreedly IFrame](https://docs.spreedly.com/guides/adding-payment-methods/iframe/) to tokenize cards. If you were to modify this application to fit those needs, you'd add one of the two right before the purchase request. Also note that 3DS 2 works with either authorize or purchase, but we've demonstrated purchase to simplify the sample application. :sweat_smile: with all of that out of the way, it's time to get started!

If you happen to have any questions or need clarification, please open up a pull request or an issue on this repo.
