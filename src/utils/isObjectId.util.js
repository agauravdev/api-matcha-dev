const ObjectId = require("mongoose").Types.ObjectId;

const isValidObjectId = (id) => {
      
    if(ObjectId.isValid(id)){
        if((new ObjectId(id).toString()) === id)
            return true;        
        return false;
    }
    return false;
}

module.exports = isValidObjectId;