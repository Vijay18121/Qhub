const jwt = require('jsonwebtoken');


const tokenGenerator =(user)=>{
    const key=process.env.S_KEY;
    const token = jwt.sign({user},key );

    return token;
};

const tokenValidator =(token)=>{
    
  try{ const key=process.env.S_KEY;
       const data = jwt.verify(token, key); 
       //console.log('token'); console.log(data); 
       return data;
    }
 catch(error){ 
    return false;}
};

module.exports = {tokenGenerator, tokenValidator};