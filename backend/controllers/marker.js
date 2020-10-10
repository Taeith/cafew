
const Marker = require('../models/marker');

exports.insert = (userId, longitude, latitude) => {
  const marker = new Marker({
    userId: userId,
    longitude: longitude,
    latitude: latitude
  });
  return marker.save();
}

exports.create = (request, response, next) => {
  createMarker(request.body.username, request.body.longitude, request.body.latitude)
  .then(() => response.status(201).json({}))
  .catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};
/*
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
*/
exports.getAll = (request, response, next) => {
  Marker.find().then(
    (markers) => {
      response.status(200).json(markers);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );
};