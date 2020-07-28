import diskRoutes from './diskAPIs.js';
import userRoutes from './userAPIs.js';

export default function(app) {
  diskRoutes(app);
  userRoutes(app);

  // send 404s to TBD
  /*
  app.get('*', (req, res) => {
    res.sendFile();
  });
  */
}
