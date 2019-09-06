const Company = require("../../models/admin/register");
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
    res.status(200).json({ Status: "Company Added Successfully" });
  }
};
