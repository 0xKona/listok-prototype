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

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const compiler = webpack(webpackConfig);

dotenv.config({ path: path.join(__dirname, './secrets/.env')});

const app = express();
const port = process.env.PORT;
console.log(port)
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