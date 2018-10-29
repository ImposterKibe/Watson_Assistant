    <?php
    // Save this code in checkBalance.php. Configure the callback URL for your phone number
    // to point to the location of this script on the web
    // e.g http://www.myawesomesite.com/checkBalance.php
    // First read in a couple of POST variables passed in with the request
    // This is a unique ID generated for this call
    $sessionId = $_POST['sessionId'];
    // Check to see whether this call is active
    $isActive  = $_POST['isActive'];
    if ($isActive == 1)  {
      // Read in the caller's number. The format will contain the + in the beginning
      $callerNumber = $_POST['callerNumber'];
      // You can replace this array with an actual database table
      $balanceArr = array(
                 '+254711XXXYYY' => 100,
                 '+254733YYYZZZ' => 150,
                 '+254711000ZZZ' => 190,
                 );

      // Read the caller's information from the database if necessary
      if ( array_key_exists($callerNumber, $balanceArr) ) {
        $balance = $balanceArr[$callerNumber];
        $text    = "Your balance is " . $balance . " shillings. Good bye.";
      } else {
        $text = "Sorry, your phone number is not registered for this service. Good Bye.";
      }

      // Compose the response
      $response  = '<?xml version="1.0" encoding="UTF-8"?>';
      $response .= '<Response>';
      $response .= '<Say>'.$text.'</Say>';
      $response .= '</Response>';

      // Print the response onto the page so that our gateway can read it
      header('Content-type: text/plain');
      echo $response;
    } else {

      // Read in call details (duration, cost). This flag is set once the call is completed.
      // Note that the gateway does not expect a response in thie case

      $duration     = $_POST['durationInSeconds'];
      $currencyCode = $_POST['currencyCode'];
      $amount       = $_POST['amount'];

      // You can then store this information in the database for your records
    }