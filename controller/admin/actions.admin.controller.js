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
    res.status(200).send({Status: 'Company Added Successfully'});
  },
  // News Controllers
  viewNews: async (req, res) => {
    const {payload, token} = req.body;
    // if token is present in req body, then execute the resolve
    if (token) {
      const response = await AdminActionSerivce.viewNews({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).json({
          status: 200,
          result: response,
        });
      }
    }
    // reject request if token is expired
    else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  viewallNews: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewallNews({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).send({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  updateNews: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.updateNews({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).send({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  deleteNews: async (req, res) => {
    const {payload, token} = req.body;
    // if token present then only perform the API Actions
    if (token) {
      const response = await AdminActionSerivce.deleteNews({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        if (response) {
          res.status(200).send({
            status: 200,
            result: 'News Deleted',
          });
        }
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },

  // Event Controller
  viewEvents: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewEvents({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).json({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  viewallEvents: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewallEvents({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).json({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  updateEvents: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.updateEvents({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).send({
          'status:': 200,
          "result": response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  deleteEvents: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.deleteEvents({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        if (response) {
          res.status(200).send({
            status: 200,
            result: 'Event Deleted',
          });
        }
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  viewFaq: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewFaq({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).json({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  viewallFaq: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewallFaq({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).json({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  updatefaq: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.updatefaq({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).send({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  deleteFaq: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.deleteFaq({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        if (response) {
          res.status(200).send({
            status: 200,
            result: 'FAQ Deleted',
          });
        }
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },

  // alumni Controller
  createalumni: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.createalumni({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        if (response == 'founduser') {
          res.status(200).json({
            status: 400,
            result: 'User Id already exists',
          });
        } else {
          res.status(200).json({
            status: 200,
            result: response,
          });
        }
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  viewalumni: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewalumni({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        if (response == null) {
          res.status(200).send({
            status: 400,
            result: 'User doesn\'t exist',
          });
        } else {
          res.status(200).json({
            status: 200,
            result: response,
          });
        }
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  allalumni: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.allalumni({payload, token});
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        res.status(200).json({
          status: 200,
          result: response,
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },

  deletealumni: async (req, res, next) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.deletealumni({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
        if (response == 'deleted') {
          res.status(200).send({
            status: 200,
            result: 'Alumni Information Deleted',
          });
        } else {
          res.status(200).send({
            status: 400,
            result: 'Error while deleting',
          });
        }
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },
  updatealumni: async (req, res) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.updatealumni({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
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
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },

  // AWS Upload; Mass Upload of User Data
  userupload: async (req, res, next) => {
    const response = await AdminActionSerivce.userupload();
    res.status(200).send({
      status: '200',
      result: 'User Data uploaded',
    });
  },
  // AWS Document Upload
  documentupload: async (req, res, next) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.documentupload({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
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
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },

  // Signed URL for AWS
  viewdocument: async (req, res, next) => {
    const {payload, token} = req.body;
    if (token) {
      const response = await AdminActionSerivce.viewdocument({
        payload,
        token,
      });
      if (response == 'tokenexpired') {
        res.status(200).send({
          status: '400',
          result: 'Token expired, Please Login Again',
        });
      } else {
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
      }
    } else {
      res.status(200).json({
        status: 400,
        result: 'Rejected Request, Token Required',
      });
    }
  },

  // ASK HR
  askHr: async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await AdminActionSerivce.askHr({payload, token});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        } else {
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
        }
      } else {
        res.status(200).json({
          status: 400,
          result: 'Rejected Request, Token Required',
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
