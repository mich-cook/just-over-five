import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/api.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.disable('x-powered-by');

routes(app);

app.listen(port, () => console.log(`just-over-five API listening on port ${port}.`));
