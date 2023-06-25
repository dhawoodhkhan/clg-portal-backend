const staffCollection = require('../model/staffModel');
const staffLogin = (req,res) => {
    try {
        staffCollection.find({"username":req.body.username,"password":req.body.password})
            .then((admins) => {
                 (admins.length>0)?res.send("true"):res.send("false")
            });
    } catch(err) {
        res.json(err.message);
    }
};

const showAllStaff = (req, res) => {
    try {
        staffCollection.find({})
            .then((staffs) => {
                res.json(staffs);
            });
    } catch(err) {
        res.json(err.message);
    }
}

const showStaff = async (req, res) => {
    try {
        let results = await staffCollection.find({$or: [{username: req.body.username},{_id: req.body._id}]});
        (results.length > 0) ? res.json(results) : res.json("No Trainee Found!");
    } catch(err) {
        res.json(err.message);
    }
}

const addStaff = async (req, res) => {
    const staff = new staffCollection(req.body);

    const output = [];

    try {
        await staff.save();
        output.push({"message": "Staff Added!", "error": ""});
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

const updateStaff = (req, res) => {
    try {
        staffCollection.updateOne({_id: req.body._id}, {$set: req.body})
            .then((results) => {
                if(results.modifiedCount > 0) {
                    res.json("Staff Updated!");
                } else {
                    res.json("Unable to Update Staff! Please try again!");
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

const deleteStaff = (req, res) => {
    try {
        staffCollection.deleteOne({_id: req.body._id})
            .then((results) => {
                if(results.deletedCount > 0) {
                    res.json("Staff Deleted!");
                } else {
                    res.json("Unable to Delete Staff! Please try again!");
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

module.exports = {staffLogin, showAllStaff, showStaff, addStaff, updateStaff, deleteStaff};