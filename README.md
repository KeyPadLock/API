# Setup after cloning repository
install dependencies with
`npm install`
start API with
`npm run start`

# API
Central API waiting for `POST` requests. Requests will be compared to valid values and a JSON object will be returned indicating if it is a valid value or not.

# Sending request to API
In order to validate a password, a JSON object of the form `{"pass": "1234"}` must be sent in a `POST` request to `{ip-of-machine-running-API}:{exposed-port-(default=3000)}/auth`
