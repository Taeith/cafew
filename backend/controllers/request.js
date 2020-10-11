const Request = require('../models/request');

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

exports.get = (request, response, next) => {
  console.log('[OPEN] REQUEST GET');
  User.find({ 
    recycler: request.params.id
  })
  .then(requests => {
    response.status(200).json(requests);
  })
  .catch(error => {
    response.status(500).json({});
  });
};
