const Company = require("../../models/admin/company.register");
const express=require('express');
module.exports = {
    add: async (req, res, next) => {
        const {companyname,companyid,companyurl,provider,tokenurl}=req.body;
        const newCompany = new Company({companyname,companyid,companyurl,provider,tokenurl});
        await newCompany.save();
    
      res.status(200).json({"Status":"Company Added"});
    }
    
};

