const jwt = require('jsonwebtoken');
const {tokenValidator} =require("./token");

module.exports = async function(req,res,next){

    try{
       
       const jwt =req.cookies;
       //console.log(jwt.token);
       const valid = await tokenValidator(jwt.token);
       if(valid){//
          next();
       }
       else {res.write("<script>alert('Kindly login!'); window.location.href = '/login'; </script>");}
    }
    catch(error){ res.write("<script>alert('Kindly login!'); window.location.href = '/login'; </script>");}
};
