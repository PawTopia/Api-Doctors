const doctorsData = require("../doctor.json")
const fs = require("fs/promises")

function getDoctor(req, res) {
    // mengambil Query id pada URL
    const { id } = req.query
    if (id) {
        // DoctorList menfilter dari beberapa id yang diberikan
        const DoctorList = id.split(',').map((id) => {

            // FindDoctorbyID mencari id jika ada, jika tidak ada akan menampilkan keseluruhan data 
            const FindDoctorbyID = doctorsData.Doctor.find((doctor) => doctor.id === parseInt(id))

            // return data jika ada, jika tidak ada return "Doctor not found" dengan status 404
            return FindDoctorbyID || { id: parseInt(id), message: "Doctor not found", status: "400" };
        })
        // membalikan respon 200 bahwa request berhasil masuk
        res.status(200).json({
            message: "Request has been received successfully",
            data: DoctorList,
        });
    } else {
        res.json(doctorsData)
    }
}
// start funtion mencari rating tertinggi dan terendah dari data yang ada
function GetHighestRating(req, res) {
    const doctorsSortedByRating = [...doctorsData.Doctor].sort((a, b) => b.rating - a.rating);

    if (doctorsSortedByRating.length === 0) {
        return res.status(404).json({ error: true, message: 'No ratings available' });
    }

    res.status(200).json({
        message: 'Doctors with the highest rating retrieved successfully',
        data: doctorsSortedByRating,
    });
}

function GetLowestRating(req, res) {
    const doctorsSortedByRating = [...doctorsData.Doctor].sort((a, b) => a.rating - b.rating);

    if (doctorsSortedByRating.length === 0) {
        return res.status(404).json({ error: true, message: 'No ratings available' });
    }


    res.status(200).json({
        message: 'Doctors with the lowest rating retrieved successfully',
        data: doctorsSortedByRating,
    });
}
// end function 

async function WriteDoctorData(data) {
    try {
        await fs.writeFile('doctor.json', JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing doctor data:', error.message);
    }
}

function validateDoctor(newDoctor, existingDoctors) {
    if (!newDoctor || !newDoctor.id || existingDoctors.some(doctor => doctor.id === newDoctor.id)) {
        return false
    } else {
        return true
    }
}

function PostDoctor(req, res) {
    //fungsi untuk post 
    const newDoctor = req.body

    //validasi Body reques dari POST
    if (!validateDoctor(newDoctor, doctorsData.Doctor)) {
        return res.status(404).json({ success: "false", message: "invalid or duplicate doctor data" })
    }

    doctorsData.Doctor.push(newDoctor)

    WriteDoctorData(doctorsData)

    res.json({ message: 'Doctor added successfully ', doctors: doctorsData.Doctor })
}

module.exports = { getDoctor, PostDoctor, GetHighestRating, GetLowestRating };