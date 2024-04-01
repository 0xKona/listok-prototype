import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackConfig from '../webpack-config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import * as url from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './api-router.js';
import helmet from 'helmet';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const compiler = webpack(webpackConfig);

dotenv.config({ path: path.join(__dirname, '../.env')});

const app = express();
const port = process.env.PORT;

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://accounts.google.com", // Allow scripts from Google's accounts domain
        "https://apis.google.com", // Allow scripts for Google's authentication service
        "'unsafe-inline'", // Use cautiously
        "'unsafe-eval'", // Use cautiously
      ],
      frameSrc: [
        "https://accounts.google.com", // Allow iframes from Google's accounts domain
        "'unsafe-inline'", // Use cautiously
        "'unsafe-eval'", // Use cautiously
      ],
      connectSrc: [
        "'self'",
        "https://accounts.google.com", // Allow connections to Google's accounts domain
        "https://apis.google.com", // Might be needed depending on Google services used
        "'unsafe-inline'", // Use cautiously
        "'unsafe-eval'", // Use cautiously
        "blob:", //allows sending blob images
      ],
      imgSrc: [
        "'self'",
        "https://lh3.googleusercontent.com", // Allow images from Google's content domain
        // You might also need to allow data: URIs for inline images and blobs
        "data:", // Use cautiously
        "blob:" // allow blob images
      ],
    },
    reportOnly: false,
  })
);

app.use(cors());
app.use(webpackMiddleware(compiler, {writeToDisk: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/dist'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json())
app.use('/api', apiRouter)
app.get('/*', (req, res, next) => res.render('index'));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});