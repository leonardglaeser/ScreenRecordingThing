const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const dir = path.join('public');
app.use(express.static(dir));
app.listen(port, () => console.log(`Server listening on port ${port}!\nServing files from ${dir}`));