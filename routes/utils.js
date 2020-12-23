//
// Simple utils class with static helper functions
//

class Utils {
    //
    // Try to send back the underlying error code and message
    //
    sendError(res, err, code = 500) {
      console.dir(err)
      console.log(`### Error with API ${JSON.stringify(err)}`)
      let statuscode = code
      if (err.code > 1) { statuscode = err.code }
  
      res.status(statuscode).send({
        "responseCode": err.code,
        "message": "Error in Api",
        "error": error
      })
      return
    }
  
    //
    // Just sends data
    //
    sendData(res, data) {
     
      res.status(200).send({
        "responseCode": 200,
        "message": "Success",
        "data": data
      })
      return
    }
  }
  
  module.exports = new Utils()
  