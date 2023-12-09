const doctorsData = require("../doctor.json")

function getDoctor(req, res) {
    // mengambil Query id pada URL
    const { id } = req.query
    if (id) {
        // DoctorList menfilter dari beberapa id yang diberikan
        const DoctorList = id.split(',').map((id) => {
            // FindDoctorbyID mencari id jika ada, jika tidak ada akan menampilkan keseluruhan data 
            const FindDoctorbyID = doctorsData.Doctor.find((doctor) => doctor.id === parseInt(id))
            // return data jika ada, jika tidak ada return "Doctor not found" dengan status 404
            return FindDoctorbyID || { id: parseInt(id), message: "Doctor not found", status: "404" };
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

function PostDoctor(req,res) {
    //fungsi untuk post 
}

module.exports = { getDoctor, PostDoctor };