// Generated by CoffeeScript 2.4.1
var JobToHttp, MeshbluAuthParser, TokenController, _, debug;

MeshbluAuthParser = require('../helpers/meshblu-auth-parser');

debug = require('debug')('meshblu-core-protocol-adapter-http:token-controller');

_ = require('lodash');

JobToHttp = require('../helpers/job-to-http');

TokenController = class TokenController {
  constructor({jobManager, jobToHttp}) {
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
    this.revokeByQuery = this.revokeByQuery.bind(this);
    this.resetToken = this.resetToken.bind(this);
    this.jobManager = jobManager;
    this.jobToHttp = jobToHttp;
  }

  create(req, res) {
    var job;
    job = this.jobToHttp.httpToJob({
      jobType: 'CreateSessionToken',
      request: req,
      toUuid: req.params.uuid,
      data: req.body
    });
    debug('dispatching request', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

  destroy(req, res) {
    var job;
    job = this.jobToHttp.httpToJob({
      jobType: 'RevokeSessionToken',
      request: req,
      toUuid: req.params.uuid,
      data: {
        token: req.params.token
      }
    });
    debug('dispatching request', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

  revokeByQuery(req, res) {
    var job;
    job = this.jobToHttp.httpToJob({
      jobType: 'RevokeTokenByQuery',
      request: req,
      toUuid: req.params.uuid,
      data: req.query
    });
    debug('dispatching request', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

  resetToken(req, res) {
    var job;
    job = this.jobToHttp.httpToJob({
      jobType: 'ResetToken',
      request: req,
      toUuid: req.params.uuid
    });
    debug('dispatching request', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

};

module.exports = TokenController;
