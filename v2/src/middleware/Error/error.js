
//Interprint the type of error
import generalError from './general.error.middleware.js';
import notfoundError from './notfound.error.middleware.js';

const errorHandler = {
	generalError:generalError,
	notfoundError:notfoundError
};

export default errorHandler;
