// Generated by CoffeeScript 2.4.1
var JobToHttp, UnregisterDeviceController, _, debug;

JobToHttp = require('../helpers/job-to-http');

debug = require('debug')('meshblu-core-protocol-adapter-http:unregister-device-controller');

_ = require('lodash');

UnregisterDeviceController = class UnregisterDeviceController {
  constructor({jobManager, jobToHttp}) {
    this.unregister = this.unregister.bind(this);
    this.jobManager = jobManager;
    this.jobToHttp = jobToHttp;
  }

  unregister(req, res) {
    var job, uuid;
    ({uuid} = req.params);
    job = this.jobToHttp.httpToJob({
      jobType: 'UnregisterDevice',
      request: req,
      toUuid: uuid
    });
    debug('dispatching request', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      if (jobResponse.metadata.code === 204) {
        jobResponse.metadata.code = 200;
        jobResponse.rawData = JSON.stringify({uuid});
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

};

module.exports = UnregisterDeviceController;
