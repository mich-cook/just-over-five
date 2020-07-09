import diskRoutes from './diskAPIs.js';

export default function(app) {
  diskRoutes(app);

  // send 404s to TBD
  /*
  app.get('*', (req, res) => {
    res.sendFile();
  });
  */
}
