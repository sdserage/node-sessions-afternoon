let swag = require(`${__dirname}/../models/swag`);

module.exports = {
  search(req,res,next){
    const {category} = req.query;
    if(category){
      let filteredSwag = swag.filter(swagObj=>swagObj.category===category);
      res.status(200).send(filteredSwag);
    }else{
      res.status(200).send(swag);
    }
  }
};
