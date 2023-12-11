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
            return FindDoctorbyID || { id: parseInt(id), success: "false", message: "Doctor not found" };
        })
        // membalikan respon 200 bahwa request berhasil masuk
        res.status(200).json({
            success: "true",
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
        return res.status(404).json({ success: false, message: 'No ratings available' });
    }

    res.status(200).json({
        message: 'Doctors with the highest rating retrieved successfully',
        data: doctorsSortedByRating,
    });
}

function GetLowestRating(req, res) {
    const doctorsSortedByRating = [...doctorsData.Doctor].sort((a, b) => a.rating - b.rating);

    if (doctorsSortedByRating.length === 0) {
        return res.status(404).json({ success: false, message: 'No ratings available' });
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


    console.log('Received new doctor data:', newDoctor);
    //validasi Body reques dari POST
    if (!validateDoctor(newDoctor, doctorsData.Doctor)) {
        console.error('Validation failed:', newDoctor);
        return res.status(400).json({ success: "false", message: "invalid or duplicate doctor data" })
    }

    //push request data kedalam array doctor
    doctorsData.Doctor.push(newDoctor)

    //menuliskan request data kedalam file doctor.json
    WriteDoctorData(doctorsData)

    // menampilkan hasil dari request
    res.status(200).json({ success: "true", message: 'Doctor added successfully ', doctors: doctorsData.Doctor.find((doctor) => doctor.id === newDoctor.id) })
}

function DeleteDoctor(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: true, message: 'Invalid ID provided' });
    }

    const updatedDoctors = doctorsData.Doctor.filter(doctor => doctor.id !== parseInt(id));

    if (updatedDoctors.length === doctorsData.Doctor.length) {
        return res.status(404).json({ error: true, message: 'No doctor with such ID was found' });
    }

    doctorsData.Doctor = updatedDoctors;

    WriteDoctorData(doctorsData);

    res.json({ message: 'Doctor deleted successfully', doctors: doctorsData.Doctor });
}

module.exports = { getDoctor, PostDoctor, GetHighestRating, GetLowestRating, DeleteDoctor };