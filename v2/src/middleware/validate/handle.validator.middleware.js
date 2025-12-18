
import {
  validationResult
} from 'express-validator';


//handle failyee
 const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return formatted error messages
   const errs = errors.array().map(e => e.msg);
   let errMsg = "";
   for (let i = 0; i<errs.length ; i++){
     errMsg += `${i+1}.) ${errs[i]} \n`;
   }
   
    return res.status(400).json({message:errMsg})
/* 
return res.status(400).json({
      errors: errors.array().map(e => e.msg)
    });
 */
  }
  next();
};

export default handleValidation