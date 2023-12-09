const express = require('express')
const app = express()
const routes = require('./doctorRoutes/routes');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}/`);
});
  
 