const validator = (schema, req, res, next) => {
    const body = req.body;
    const {error} = schema.validate(body);
    if(error) {
        res.status(422).send(error.message);
    }
    next();
}

export default validator;