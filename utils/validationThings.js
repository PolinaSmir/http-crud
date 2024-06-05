const yup = require("yup");

const ThingSchema = yup.object({
  body: yup.string().required().min(3).max(100),
});

module.exports.validateThing = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedObject = await ThingSchema.validate(body);

    if (validatedObject) {
      next();
    }
  } catch (error) {
    next(error);
  }
};
