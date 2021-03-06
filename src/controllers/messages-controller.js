// Generated by CoffeeScript 2.4.1
var JobToHttp, MeshbluAuthParser, MessagesController, _, debug;

debug = require('debug')('meshblu-core-protocol-adapter-http:messages-controller');

_ = require('lodash');

JobToHttp = require('../helpers/job-to-http');

MeshbluAuthParser = require('../helpers/meshblu-auth-parser');

MessagesController = class MessagesController {
  constructor({jobManager, jobToHttp}) {
    this.create = this.create.bind(this);
    this.jobManager = jobManager;
    this.jobToHttp = jobToHttp;
    this.authParser = new MeshbluAuthParser;
  }

  create(req, res) {
    var auth, job;
    auth = this.authParser.parse(req);
    job = this.jobToHttp.httpToJob({
      jobType: 'SendMessage',
      request: req,
      toUuid: auth.uuid
    });
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

};

module.exports = MessagesController;
