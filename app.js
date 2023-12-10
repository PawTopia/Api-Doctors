const express = require('express')
const app = express()
const routes = require('./doctorRoutes/routes');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/Api',routes)

// handle request Url lain
app.use((req, res) => {
    res.status(404).json({ error: true, message: 'Endpoint not found' });
  });

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}/Api`);
    
});
  
 