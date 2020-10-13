const Request = require('../models/request');
const userCtrl = require('../controllers/user');

function getById(id, callback) {
  console.log('[OPEN] REQUEST GET BY ID');
  Request.findOne({ _id: id })
  .then(request => {
    callback(request);
  })
  .catch(error => {
    console.log("[ERROR] Request can' be find.");
  });
}

function create(producer, recycler) {
  const request = new Request({
    producer: producer,
    recycler: recycler,
  });
  return request.save();
}

exports.add = (request, response, next) => {
  console.log('[OPEN] REQUEST ADD');
  create(request.body.producer, request.body.recycler)
  .then(() => {
    response.status(201).json({})
  })
  .catch(error => {
    response.status(500).json({});
  });
};

function getForProducer(id, state) {
  console.log('[OPEN] REQUEST GET FOR PRODUCER');
  return Request.find({ 
    producer: id,
    state: state
  });
}

function getForRecycler(id, state) {
  console.log('[OPEN] REQUEST GET FOR RECYCLER');
  /*
  Request.find({ 
    recycler: id,
    state: state
  })
  */
  return Request.aggregate([{
    $lookup: {
       from: "user",
       localField: "producer",
       foreignField: "id",
       as: "usesdsd"
    }
  }]);


}

exports.get = (request, response, next) => {
  console.log('[OPEN] REQUEST GET');
  console.log('[PARAMS] <' + request.params.type + ', ' + request.params.id + ', ' + request.params.state + '>');
  var set = null;
  switch (request.params.type) {
    case 'producer':
      set = getForProducer(request.params.id, request.params.state);
      break;
    case 'recycler':
      set = getForRecycler(request.params.id, request.params.state);
      break;
  }
  set.then(data => {
    console.log(JSON.stringify(data));
    response.status(200).json(data);
  })
  .catch(error => {
    response.status(500).json({});
  });
};

exports.delete = (request, response, next) => {
    console.log("[OPEN] REQUEST DELETE");
    Request.deleteOne({_id: request.params.id})
    .then(() => {
      console.log("[INFO] Request has been deleted");
      response.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch(error => {
      console.log("[ERROR] Request can't be deleted");
      response.status(400).json({
        error: error
      });
    }
  );
};

exports.update = (request, response, next) => {
  console.log('[OPEN] REQUEST UPDATE');
  console.log('[PARAMS] <' + request.params.id + ', ' + request.body.state + '>');
  getById(request.params.id, req => {
    const newRequest = new Request({
      _id: req._id,
      producer: req.producer,
      recycler: req.recycler,
      state: request.body.state
    });
    Request.updateOne({ _id: req._id }, newRequest)
    .then(() => {
      console.log('[SUCCESS] REQUEST UPDATE');
      response.status(201).json({});
    })
    .catch(error => {
      console.log('[ERROR] REQUEST UPDATE');
      response.status(500).json({})
    });
  })
};
