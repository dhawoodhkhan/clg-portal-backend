const adminCollection = require("../model/model");
const loginController = (req,res) => {
    try {
        adminCollection.find({"username":req.body.username,"password":req.body.password})
            .then((admins) => {
                 (admins.length>0)?res.send("true"):res.send("false")
            });
    } catch(err) {
        res.json(err.message);
    }
};

const showAllAdmin = (req, res) => {
    try {
        adminCollection.find({})
            .then((admins) => {
                res.json(admins);
            });
    } catch(err) {
        res.json(err.message);
    }
}

const showAdmin = async (req, res) => {
    try {
        let results = await adminCollection.find({username: req.body.username});
        (results.length > 0) ? res.json(results) : res.json("No Admin Found!");
    } catch(err) {
        res.json(err.message);
    }
}

const addAdmin = async (req, res) => {
    const admin = new adminCollection(req.body);

    const output = [];

    try {
        await admin.save();
        output.push({"message": "Admin Added!", "error": ""});
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

const updateAdmin = (req, res) => {
    try {
        adminCollection.updateOne({username: req.body.username}, {$set: req.body})
            .then((results) => {
                if(results.modifiedCount > 0) {
                    res.json("Admin Updated!");
                } else {
                    res.json("Unable to Update Admin! Please try again!");
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

const deleteAdmin = (req, res) => {
    try {
        adminCollection.deleteOne({username: req.body.username})
            .then((results) => {
                if(results.deletedCount > 0) {
                    res.json("Admin Deleted!");
                } else {
                    res.json("Unable to Delete Admin! Please try again!");
                }
            });
    } catch(err) {
        res.json(err.message);
    }
}

module.exports = {loginController, showAllAdmin, showAdmin, addAdmin, updateAdmin, deleteAdmin};