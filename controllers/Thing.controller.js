const { Thing } = require("../models/index");
const NotFoundError = require("../errors/NotFoundError");

module.exports.createThing = async (req, res, next) => {
  const { body } = req;
  try {
    const createdThing = await Thing.create(body);

    if (createdThing) {
      return res.status(201).send(createdThing);
    } else {
      throw new ReferenceError("Reference Error! (createThing - controller)");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllThings = async (req, res, next) => {
  try {
    const things = await Thing.findAll();
    return res.status(200).send(things);
  } catch (error) {
    next(error);
  }
};

module.exports.getOne = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const thing = await Thing.findByPk(id);

    if (thing.length > 0) {
      return res.status(200).send(thing);
    } else {
      throw new NotFoundError();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateOne = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const updatedThing = await Thing.updateByPk({ id: Number(id), updateValues: body });

    return res.status(200).send(updatedThing);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteOne = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  try {
    const deletedThing = await Thing.deleteByPk(id);
    return res.status(200).send(deletedThing);
  } catch (error) {
    next(error);
  }
};
