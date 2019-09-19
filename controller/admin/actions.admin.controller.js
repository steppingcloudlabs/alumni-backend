const Company = require("../../models/admin/register");
const AdminActionSerivce = require("../../services/adminActions.services")();
const express = require("express");
module.exports = {
    add: async(req, res, next) => {
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
    addNews: async(req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.addNews({ payload })
        res.status(200).json({ "status:": "200 OK", "New Entry saved for ": reponse });
    },
    viewNews: async(req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewNews({ payload })
        res.status(200).json({ reponse });
    },
    addEvents: async(req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.addEvents({ payload })
        res.status(200).json({ "status:": "200 OK", "New Entry saved for ": reponse });
    },
    viewEvents: async(req, res) => {
        payload = req.body;
        const reponse = await AdminActionSerivce.viewEvents({ payload })
        res.status(200).json({ reponse });
    }
};