import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  const authenticationMiddleware = (req, res, next) => {
    // Check for the presence of the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_VALUE

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    // Validate the token
    if (token !== "YOUR_ACCESS_TOKEN") {
        return res.sendStatus(403); // Forbidden
    }

    next(); // Proceed to the next middleware/route handler
};

app.use(authenticationMiddleware)

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage", async (req, res) => {
    const filterImage = await filterImageFromURL(req.query.image_url)
    res.set('File-URL', filterImage);
    res.sendFile(filterImage);
  } );

  app.delete( "/delete", async (req, res) => {
    await deleteLocalFiles([req.query.image_url])
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
