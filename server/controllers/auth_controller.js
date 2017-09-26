let users = require(`${__dirname}/../models/users`);
let id = 1;

module.exports = {
  login(req,res,next){
    const {username, password} = req.body;
    const matchedUser = users.filter(user => user.username === username && user.password === password);
    if(matchedUser[0]){
      const user = matchedUser[0];
      res.status(200).send(user);
    }else{
      res.status(500).send("ERROR, user not found.");
    }
  },
  register(req,res,next){
    const {username, password} = req.body;
    const user = {username, password, id};
    users.push(user);
    id++;
    req.session.user.username = user.username;
    res.status(200).send(user);
  },
  signout(req,res,next){
    req.session.destroy();
    res.status(200).send(req.session);
  },
  getUser(req,res,next){
    res.status(200).send(req.session.user);
  }
};
