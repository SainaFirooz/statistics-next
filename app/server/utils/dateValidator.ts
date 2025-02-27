import Joi from "joi";

export const dateValidator = (from?: string, to?: string) => {
  const schema = Joi.object({
    from: Joi.date().iso().optional(),
    to: Joi.date().iso().optional().greater(Joi.ref("from")).optional(),
  });

  const { error, value } = schema.validate({ from: from, to: to });

  if (error) {
    if (
      error.details.some((detail) => detail.message.includes("greater than"))
    ) {
      throw new Error("toDate cannot be earlier than fromDate");
    }
    throw new Error("Invalid date input");
  }

  return value;
};
