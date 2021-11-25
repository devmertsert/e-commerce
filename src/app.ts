// load .env
import dotenv from 'dotenv';
dotenv.config();

// create app
import express from 'express';
const app = express();

// configure cors
import cors from 'cors';
app.use(cors());

// import bodyParser middleware
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import routes
import { routes } from './routes'
app.use(routes);

// load the database helper
import connect from './models/db';
connect(process.env.MONGODB_URI as string)

// set the port
const port: number = parseInt(process.env.PORT as string) || 3000;


// start the server
app.listen(port, async () => {
    console.clear();
    console.info(`Server has started on PORT: ${port} at "${new Date().toUTCString()}"`);
});