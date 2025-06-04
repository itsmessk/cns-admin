import { Router } from 'express';
import authorize from "../middleware/auth.middleware.js";
import {
    deleteServiceRequest,
    getServiceRequest,
    getServiceRequests, patchServiceRequest,
    setServiceRequest, updatePriceEst, updateRatingReview, updateServiceRequest, updateStatus
} from "../controllers/serviceRequest.controllers,js.js";

const serviceRequest = Router();

serviceRequest.get('/', authorize, getServiceRequests);

serviceRequest.post('/', setServiceRequest);

serviceRequest.get('/:id', authorize, getServiceRequest);

serviceRequest.delete('/:id', authorize, deleteServiceRequest);

serviceRequest.put('/:id', authorize, updateServiceRequest);

serviceRequest.patch('/:id', authorize, patchServiceRequest);

serviceRequest.patch('/:id/status', authorize, updateStatus)

serviceRequest.patch('/:id/review', updateRatingReview);

serviceRequest.patch('/:id/price', authorize, updatePriceEst)

export default serviceRequest;

