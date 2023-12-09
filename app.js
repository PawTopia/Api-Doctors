const express = require('express')
const app = express()
const port = process.env.PORT || 3000;


app.get('/',(req, res)=> {
  const dokterList = [
    { id: 1, nama: 'Dokter A', spesialis: 'Anjing', jadwal: ['Senin: 10.00 - 11.00', 'Kamis: 15.00 - 16.00'] },
    { id: 2, nama: 'Dokter B', spesialis: 'Kucing', jadwal: ['Selasa: 09.00 - 10.00', 'Rabu: 14.00 - 15.00'] },
  ];
  res.send(dokterList);
})

app.listen(port, () => console.log(`Server berjalan pada port ${port}.`));

  
 