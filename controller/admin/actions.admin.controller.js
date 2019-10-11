const Company = require("../../models/admin/register");
const AdminActionSerivce = require("../../services/adminActions.services")();
const express = require("express");
module.exports = {
    add: async (req, res, next) => {
        const {
            companyname,
            companyid,
            companyurl,
            cloudprovider,
            idp,
            tokenurl,
            clientid,
            userid,
            privatekey
        } = req.body;

        const newCompany = new Company({
            companyname,
            companyid,
            companyurl,
            cloudprovider,
            idp,
            tokenurl,
            clientid,
            userid,
            privatekey

        });
        await newCompany.save();
        res.status(200).send({ Status: "Company Added Successfully" });
    },
    addNews: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.addNews({ payload })
        res.status(200).send({ "status:": "200 OK", "New Entry saved for ": reponse });
    },
    viewNews: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewNews({ payload })
        res.status(200).json({ reponse });
    },
    viewallNews: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewallNews({ payload })
        res.status(200).json({ reponse });
    },
    updateNews: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.updateNews({ payload })
        res.status(200).send({
            status: 200,
            "message": "News Section Updated"
        });
    },
    deleteNews: async (req, res) => {
        payload = req.body;
        const response = await AdminActionSerivce.deleteNews({ payload })
        if (response) {
            res.status(200).send({
                status: 200,
                message: {
                    "response": "News Deleted",
                    "No. of Deleted Documents": response.deletedCount,
                    "result": "IMPLEMENTED "
                }
            });
        }
    },
    addEvents: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.addEvents({ payload })
        res.status(200).json({ "status:": "200 OK", "New Entry saved for ": reponse });
    },
    viewEvents: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewEvents({ payload })
        res.status(200).json({ reponse });
    },

    viewallEvents: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewallEvents({ payload })
        res.status(200).json({ reponse });
    },
    updateEvents: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.updateEvents({ payload })
        res.status(200).send({
            status: 200,
            "message": "Evemts Section Updated"
        });
    },
    deleteEvents: async (req, res) => {
        payload = req.body;
        const response = await AdminActionSerivce.deleteEvents({ payload })
        if (response) {
            res.status(200).send({
                status: 200,
                message: {
                    "response": "Event Deleted",
                    "No. of Deleted Documents": response.deletedCount,
                    "result": "IMPLEMENTED "
                }
            });
        }
    },

    addFaq: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.addFaq({ payload })
        res.status(200).json({ "status:": "200 OK", "New Entry saved for ": reponse });
    },
    viewFaq: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewFaq({ payload })
        res.status(200).json({ reponse });
    },

    viewallFaq: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewallFaq({ payload })
        res.status(200).json({ reponse });
    },
    updatefaq: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.updatefaq({ payload })
        res.status(200).send({
            status: 200,
            "message": "FAQs Updated"
        });
    },

    deleteFaq: async (req, res) => {
        payload = req.body;
        const response = await AdminActionSerivce.deleteFaq({ payload })
        if (response) {
            res.status(200).send({
                status: 200,
                message: {
                    "response": "FAQ Deleted",
                    "No. of Deleted Documents": response.deletedCount,
                    "result": "IMPLEMENTED "
                }
            });
        }
    },
    createalumni: async (req, res) => {
        payload = req.body;
        const response = await AdminActionSerivce.createalumni({ payload })
        if(response=='founduser'){
            res.status(200).json({ "status:": 400,
             "Message":"User Id already exists"  });
        }
        else{
        res.status(200).json({ "status:": "200 OK", "New Entry saved for ": response });
        }
    },
    viewalumni: async (req, res) => {
        payload = req.body;
        const response = await AdminActionSerivce.viewalumni({ payload })
        if (response == null) {
            res.status(200).send({
                status: 400,
                message: {
                    "result": "User doesn't exist"
                }
            });
        }
        else {
        res.status(200).json({ response });
        }
    },
    allalumni: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.allalumni({})
        res.status(200).json({ reponse });
    },
    updatealumni: async (req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.updatealumni({ payload })
        if (reponse == null) {
            res.status(200).send({
                status: 400,
                message: {
                    "result": "UserId doesn't exist"
                }
            });
        }
        else {
            res.status(200).send({
                status: "Ok",
                message: "Alumni Information Uodated"
            });
        }
    },
    deletealumni: async (req, res) => {
        payload = req.body;
        const response = await AdminActionSerivce.deletealumni({ payload })
        if (response) {
            res.status(200).send({
                status: 200,
                message: {
                    "response": "Alumni Information Deleted",
                    "No. of Deleted Documents": response.deletedCount,
                    "result": "Ok "
                }
            });
        }
    },
    userupload: async (req, res, next) => {
        const response = await AdminActionSerivce.userupload()
        res.status(200).send({
            status: "200",
            message: "Hello Bro howdy You",
            message2: response

        })

    },
    documentupload: async (req, res, next) => {
        payload = req.body;
        const response = await AdminActionSerivce.documentupload({ payload })
        if (response) {
            res.status(200).send({
                status: "200",
                message: "Document Uploaded",


            })
        }
        else {
            res.status(200).send({
                status: 400,
                message: "errror while uploading"
            })
        }

    },
    viewdocument: async (req, res, next) => {
        payload = req.body;
        const response = await AdminActionSerivce.viewdocument({ payload })
        res.status(200).send({
            status: "200",
            message: "welcome Maaz",
            message2: response

        })

    }
};
