// This file configures a web server for running the production build

import {chalkProcessing} from './chalkConfig';
import express from 'express';
import path from 'path';

/* eslint-disable no-console */
console.log(chalkProcessing('Starting Express Server...'));

const port = 8081;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../dist')));
// app.use('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/../dist/index.html'));
// });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
