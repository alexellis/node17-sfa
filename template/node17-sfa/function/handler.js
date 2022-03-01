'use strict'

module.exports = async (event, context) => {

  // Redirect any GET requests for the root path to the
  // React app.
  if(event.method == "GET" && event.path == "/") {
    return context
    .headers({"Location": "/function/myportal/app/"})
    .status(307)
    .succeed({})
  }

  // Any other requests are handled by our function below.
  const result = {
    'body': JSON.stringify(event.body),
    'content-type': event.headers["content-type"]
  }

  return context
    .status(200)
    .succeed(result)
}
