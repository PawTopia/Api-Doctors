const mapDummydata = require("../clinics.json")

function getMapClinic(req, res) {
    const {location} = req.body
    if (location) {
        // Find specific clinic based on request body parameters
        const foundClinics = mapDummydata.petShopDummyMap.filter((clinic) => {
            return (
                (!location || clinic.location.toLowerCase().includes(location.toLowerCase()))
            );
        });

        if (foundClinics.length === 0) {
            return res.status(404).json({ message: 'No matching clinic found.' });
        }

        return res.status(200).json({Success:"True",message:"Data found",foundClinics});
    } else {
        // Display all clinics when there is no request body
        return res.status(200).json({Success:"True",message:"Request has been received successfully", data:mapDummydata.petShopDummyMap});
    }
}


module.exports = { getMapClinic }