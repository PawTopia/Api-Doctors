const express = require('express')
const routes = express.Router()
const doctorHandler = require("../doctorHandlers/handler")
const mapHandler = require("../mapHandlers/handler")

//middleware yang dipakai adalah JSON-encoded bodies
routes.use(express.json());

//route url GET doctors
routes.get("/doctors" , doctorHandler.getDoctor);

//route url GET rating doctors
routes.get("/doctors/rating/highest", doctorHandler.GetHighestRating)

routes.get("/doctors/rating/lowest", doctorHandler.GetLowestRating)

//route url DELETE doctors
routes.delete("/doctors/delete", doctorHandler.DeleteDoctor)

//route url POST doctors
routes.post("/doctors", doctorHandler.PostDoctor);

//route url GET map-clinic
routes.get('/Clinic', mapHandler.getMapClinic)



module.exports = routes;
