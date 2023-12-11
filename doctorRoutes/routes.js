const express = require('express')
const routes = express.Router()
const doctorHandler = require("../doctorHandlers/handler")

//middleware yang dipakai adalah JSON-encoded bodies
routes.use(express.json());

//route url GET doctors
routes.get("/doctors" , doctorHandler.getDoctor);

//route url GET rating doctor
routes.get("/doctors/rating/highest", doctorHandler.GetHighestRating)

routes.get("/doctors/rating/lowest", doctorHandler.GetLowestRating)

routes.delete("/doctors/delete", doctorHandler.DeleteDoctor)


//route url POST doctors
routes.post("/doctors", doctorHandler.PostDoctor);



module.exports = routes;
