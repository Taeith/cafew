var ObjectId = require('mongodb').ObjectID;

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

function getForRecycler(response, id, state) {
  console.log('[OPEN] REQUEST GET FOR RECYCLER');
  return Request.aggregate([{
    $match: {
      state: state,
      recycler: ObjectId(id)
    }
  }, {
    $lookup: {
       from: "users",
       localField: "producer",
       foreignField: "_id",
       as: "user"
    }
  }
  ])
  .then(requests => {
    console.log(JSON.stringify(requests));
    response.status(200).json(requests);
  })
  .catch(error => {
    response.status(500).json({});
  });
}

exports.get = (request, response, next) => {
  console.log('[OPEN] REQUEST GET');
  console.log('[PARAMS] <' + request.params.type + ', ' + request.params.id + ', ' + request.params.state + '>');
  var set = null;
  switch (request.params.type) {
    case 'producer':
      return getForProducer(response, request.params.id, request.params.state);
    case 'recycler':
      return getForRecycler(response, request.params.id, request.params.state);
  }
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

/*
requests = requests.map(request => new Map()
      .set({
      _id = request._id,
      producer_id = request.producer,
      username = request.user[0].username,
      city = request.user[0].city,
      capacity = request.user[0].capacity,
    }));
    response.status(200).json(requests);


*/