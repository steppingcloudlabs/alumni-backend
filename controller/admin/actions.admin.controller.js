const Company = require('../../models/admin/register');
const AdminActionSerivce = require('../../services/adminActions.services')();
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
  addNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.addNews({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to add News!!',
      });
    } {res.status(200).send({'status:': '200 OK', 'result ': response});}
  },
  viewNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewNews({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view News!!',
      });
    }
    res.status(200).send({'status:': '200 OK', 'result ': response});
  },
  viewallNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewallNews({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view all News!!',
      });
    }
    res.status(200).send({'status:': '200 OK', 'result ': response});
  },
  updateNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updateNews({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to Update News Section!!',
      });
    }
    res.status(200).send({
      'status': 200,
      'message': 'News Section Updated',
    });
  },
  deleteNews: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deleteNews({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to delete News!!',
      });
    }
    if (response) {
      res.status(200).send({
        status: 200,
        message: {
          'response': 'News Deleted',
          'No. of Deleted Documents': response.deletedCount,
          'result': 'IMPLEMENTED ',
        },
      });
    }
  },
  addEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.addEvents({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to add Event!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result: New Entry saved for ': reponse,
    });
  },
  viewEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewEvents({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view Events!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result': reponse,
    });
  },

  viewallEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewallEvents({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view all Events!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result': reponse,
    });
  },
  updateEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updateEvents({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to update Events!!',
      });
    }
    res.status(200).send({
      'status': '200 OK',
      'message': 'Events Section Updated',
    });
  },
  deleteEvents: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deleteEvents({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to delete Events!!',
      });
    }
    if (response) {
      res.status(200).send({
        status: 200,
        message: {
          'response': 'Event Deleted',
          'No. of Deleted Documents': response.deletedCount,
        },
      });
    }
  },

  addFaq: async (req, res) => {
    payload = req.body;
    const reponse = await AdminActionSerivce.addFaq({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to add FAQ!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'New Entry saved for ': reponse,
    });
  },
  viewFaq: async (req, res) => {
    payload = req.body;
    const reponse = await AdminActionSerivce.viewFaq({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view all FAQ!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result ': reponse,
    });
  },

  viewallFaq: async (req, res) => {
    payload = req.body;
    const reponse = await AdminActionSerivce.viewallFaq({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view all FAQ!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result ': reponse,
    });
  },
  updatefaq: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.updatefaq({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to update FAQ!!',
      });
    }
    res.status(200).send({
      'status': 200,
      'message': 'FAQs Updated',
    });
  },

  deleteFaq: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.deleteFaq({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to delete FAQ!!',
      });
    }
    if (response) {
      res.status(200).send({
        status: 200,
        message: {
          'response': 'FAQ Deleted',
          'result: No. of Deleted Documents': response.deletedCount,

        },
      });
    }
  },
  user: async (req, res, next) => {
    try {
      const payload = req.params;
      const response = await AdminActionSerivce.user({payload});
      if (!response) {
        res.status(200).send({
          'status:': '400',
          'result ': 'Not able to add user!!',
        });
      }
      res.status(200).send({
        status: 200,
        message: {
          'response': response,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  createalumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.createalumni({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to add user!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result': response,
    });
  },
  viewalumni: async (req, res) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewalumni({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view alumni!!',
      });
    }
    res.status(200).json({
      'status:': '200 OK',
      'result': response,
    });
  },
  updatealumni: async (req, res) => {
    payload = req.body;
    const reponse = await AdminActionSerivce.updatealumni({payload});
    if (reponse == null) {
      res.status(200).send({
        status: 400,
        message: {
          'result': 'UserId doesn\'t exist',
        },
      });
    } else {
      res.status(200).send({
        status: '200 Ok',
        message: 'Alumni Information Uodated',
        result: reponse,

      });
    }
  },
  userupload: async (req, res, next) => {
    const response = await AdminActionSerivce.userupload();
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to upload user!!',
      });
    }
    res.status(200).send({
      status: '200',
      result: response,

    });
  },
  documentupload: async (req, res, next) => {
    payload = req.body;
    const response = await AdminActionSerivce.documentupload({payload});
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
  viewdocument: async (req, res, next) => {
    payload = req.body;
    const response = await AdminActionSerivce.viewdocument({payload});
    if (!response) {
      res.status(200).send({
        'status:': '400',
        'result ': 'Not able to view document!!',
      });
    }
    res.status(200).send({
      status: '200',
      result: response,
    });
  },
};
