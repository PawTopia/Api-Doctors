const map = require("../clinics.json")

function getMapClinic(req, res) {
    const { name, location, type } = req.body

    if (name || location || type) {
        // Find specific clinic based on request body parameters
        const foundClinics = clinicsData.petShopDummyMap.filter((clinic) => {
            return (
                (!name || clinic.name.toLowerCase().includes(name.toLowerCase())) &&
                (!location || clinic.location.toLowerCase().includes(location.toLowerCase())) &&
                (!type || clinic.type.toLowerCase() === type.toLowerCase())
            );
        });

        if (foundClinics.length === 0) {
            return res.status(404).json({ message: 'No matching clinic found.' });
        }

        return res.status(200).json(foundClinics);
    } else {
        // Display all clinics when there is no request body
        return res.status(200).json(clinicsData.petShopDummyMap);
    }
}

module.exports = { getMapClinic }