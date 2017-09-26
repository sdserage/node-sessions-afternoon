let swag = require(`${__dirname}/../models/swag`);

module.exports = {
  add(req,res,next){
    const {id} = req.query;
    let {cart} = req.session.user;
    const index = cart.findIndex(swag=>swag.id==id);
    if(index < 0){
      const selectedSwag = swag.find(swag=>swag.id==id);
      cart.push(selectedSwag);
      req.session.user.total += selectedSwag.price;
    }
    res.status(200).send(req.session.user);
  },
  remove(req,res,next){
    const {id} = req.query;
    let {cart} = req.session.user;
    const index = cart.findIndex(swag=>swag.id==id);
    if(index > -1){
      req.session.user.total -= cart[index].price;
      cart.splice(index,1);
    }
    res.status(200).send(req.session.user);
  },
  checkout(req,res,next){
    req.session.user.cart = [];
    req.session.user.total = 0;
    res.status(200).send(req.session.user);
  }
};
