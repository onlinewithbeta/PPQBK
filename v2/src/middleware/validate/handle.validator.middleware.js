import { validationResult } from "express-validator";

//handle failyee
const handleValidation = (req, res, next) => {
 const errors = validationResult(req);

 if (!errors.isEmpty()) {
  // Return formatted error messages
  const errs = errors.array().map(e => e.msg);
  let errMsg = "";

  console.log("Validation Error :");

  for (let i = 0; i < errs.length; i++) {
   errMsg += `${i + 1}.) ${errs[i]} \n`;
   console.log(`${i + 1}.) ${errs[i]}`);
  }

  //return res.status(400).json({message:errMsg})
  return res.status(400).json({
   success: false,
   message: errs[0],
   errors: errs
  });
  /* 
return res.status(400).json({
      errors: errors.array().map(e => e.msg)
    });
 */
 }
 next();
};

export default handleValidation;
