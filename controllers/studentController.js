const studentCollection = require('../model/studentModel');
const studentLogin = (req,res) => {
    try {
        studentCollection.find({"username":req.body.username,"password":req.body.password})
            .then((admins) => {
                 (admins.length>0)?res.send("true"):res.send("false")
            });
    } catch(err) {
        res.json(err.message);
    }
};

const uploadPicture = (req, res) => {
    // const url = req.protocol + "://" + req.get('host');
    const picture = '/students/'+req.file.filename;
    console.log(picture);

    if(picture){
        try {
            studentCollection.updateOne({username: req.body.username}, {$set: {picture: picture}})
                .then((results) => {
                    if(results.modifiedCount > 0) {
                        res.json({msg: "Uploaded", picture: picture});
                    } else {
                        res.json("Unable to Update student! Please try again!");
                    }
                });
        } catch(err) {
            res.json(err.message);
        }
    }
};

const showAllStudent = (req, res) => {
    try {
        studentCollection.find({})
            .then((students) => {
                res.json(students);
            });
    } catch(err) {
        res.json(err.message);
    }
}

const showStudent = async (req, res) => {
    try {
        let results = await studentCollection.find({$or: [{username: req.body.username},{_id: req.body._id}]});
        (results.length > 0) ? res.json(results) : res.json("No Student Found!");
    } catch(err) {
        res.json(err.message);
    }
}

const addStudent = async (req, res) => {
    const student = new studentCollection(req.body);

    const output = [];

    try {
        await student.save();
        output.push({"message": "student Added!", "error": ""});
        res.json(output);
    }catch(err) {
        let errorList = [];
        if(err.errors) {
            for(let temp in err.errors) {
                errorList.push(err.errors[temp].message);
            }
        }
        output.push({"message": "", "error": errorList});
        res.json(output);
    }
}

const updateStudent = (req, res) => {
    try {
        studentCollection.updateOne({_id: req.body._id}, {$set: req.body})
            .then((results) => {
                if(results.modifiedCount > 0) {
                    res.json("student Updated!");
                } else {
                    res.json("Unable to Update student! Please try again!");
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

const deleteStudent = (req, res) => {
    try {
        studentCollection.deleteOne({_id: req.body._id})
            .then((results) => {
                if(results.deletedCount > 0) {
                    res.json("student Deleted!");
                } else {
                    res.json("Unable to Delete student! Please try again!");
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

module.exports = {studentLogin, showAllStudent, showStudent, addStudent, updateStudent, deleteStudent, uploadPicture};