const Company = require('../../models/admin/register');
const AdminActionSerivce = require('../../services/adminActions.services')();
const express = require('express');
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
      privatekey,
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
      privatekey,
    });
    await newCompany.save();
    res.status(200).send({ Status: "Company Added Successfully" });
  },
  // News Controller
  viewNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewNews({ payload })
    res.status(200).json({
      status: 200,
      result: response
    });
  },
  viewallNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewallNews({ payload })
    res.status(200).send({
      status: 200,
      "result": response
    });
  },
  updateNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updateNews({ payload })
    res.status(200).send({
      status: 200,
      "result": response
    });
  },
  deleteNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deleteNews({ payload })
    if (response) {
      res.status(200).send({
        status: 200,
        result: "News Deleted"

      });
    }
  },

  //Event Controller
  viewEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewEvents({ payload })
    res.status(200).json({
      status: 200,
      result: response
    });
  },
  viewallEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewallEvents({ payload })
    res.status(200).json({
      status: 200,
      result: response
    });
  },
  updateEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updateEvents({ payload })
    res.status(200).send({
      "status:": 200,
      "result": response
    });
  },
  deleteEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deleteEvents({ payload })
    if (response) {
      res.status(200).send({
        status: 200,
        result: "Event Deleted",

      });
    }
  },


  viewFaq: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewFaq({ payload })
    res.status(200).json({
      status: 200,
      result: response
    }
    );
  },
  viewallFaq: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewallFaq({ payload })
    res.status(200).json({
      status: 200,
      result: response
    });
  },
  updatefaq: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updatefaq({ payload })
    res.status(200).send({
      "status": 200,
      "result": response
    });
  },
  deleteFaq: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deleteFaq({ payload })
    if (response) {
      res.status(200).send({
        status: 200,
        result: "FAQ Deleted"
      });
    }
  },

  //alumni Controller
  createalumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.createalumni({ payload })
    if (response == 'founduser') {
      res.status(200).json({
        "status": 400,
        "result": "User Id already exists"
      });
    }
    else {
      res.status(200).json({
        status: 200,
        "result": response
      });
    }
  },
  viewalumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewalumni({ payload })
    if (response == null) {
      res.status(200).send({
        status: 400,
        result: "User doesn't exist"
      });
    }
    else {
      res.status(200).json({
        status: 200,
        result: response
      });
    }
  },
  allalumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.allalumni({})
    res.status(200).json({
      status: 200,
      result: response
    });
  },

  deletealumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deletealumni({ payload })
    if (response) {
      res.status(200).send({
        status: 200,
        result: "Alumni Information Deleted",
      });
    }
    else {
      res.status(200).send({
        status: 400,
        result: "Error while deleting",
      });
    }
  },
  updatealumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updatealumni({ payload });
    if (response == null) {
      res.status(200).send({
        status: 400,
        result: 'UserId doesn\'t exist',
      });
    } else {
      res.status(200).send({
        status: '200',
        result: 'Alumni Information Updated',
      });
    }
  },



  //AWS Upload; Mass Upload of User Data
  userupload: async (req, res, next) => {
    const response = await AdminActionSerivce.userupload();
    res.status(200).send({
      status: '200',
      result: 'User Data uploaded',

    });
  },
  //AWS Document Upload
  documentupload: async (req, res, next) => {
    payload = req.body;
    const response = await AdminActionSerivce.documentupload({ payload });
    if (response) {
      res.status(200).send({
        status: '200',
        result: 'Document Uploaded',


      });
    } else {
      res.status(200).send({
        status: 400,
        result: 'errror while uploading',
      });
    }
  },

  //Signed URL for AWS
  viewdocument: async (req, res, next) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewdocument({ payload });
    if (response == 'notfounduser') {
      res.status(200).send({
        status: '400',
        result: 'User Doesnot Exist',

      });
    } else {
      res.status(200).send({
        status: '200',
        result: response,

      });
    }
  },

  //ASK HR
  askHr: async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await AdminActionSerivce.askHr(payload);
      if (response && response.length == 0) {
        res.status(200).send({
          status: 400,
          result: 'User doesn\'t exist',
        });
      } else {
        res.status(200).send({
          status: 200,
          result: response,
        });
      }
    } catch (error) {
      next(error);
    }
  }

};