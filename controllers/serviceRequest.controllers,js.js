import ServiceRequest from "../models/serviceRequest.models.js";

export const getServiceRequests = async (req, res, next) => {
    try{
        const services = await ServiceRequest.find();

        if(services.length === 0){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        res.status(200).send({
            success: true,
            count: services.length,
            services: services,
        });
    } catch(error){
        next(error);
    }
}



export const setServiceRequest = async (req, res, next) => {
    try{
        const requestData = {...req.body};

        const newReq = new ServiceRequest(requestData);

        const saveReq = await newReq.save();

        res.status(200).send({
            success: true,
            message: 'Service request successfully saved',
        });
    } catch(error){
        next(error);
    }
}

export const getServiceRequest = async (req, res, next) => {
    try{
        const service = await ServiceRequest.findById(req.params.id);

        if(!service){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        res.status(200).send({
            success: true,
            data: service,
        })
    } catch(error){
        next(error);
    }
}

export const deleteServiceRequest = async (req, res, next) => {
    try{
        const service = await ServiceRequest.findById(req.params.id);

        if(!service){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;

        }

        await service.deleteOne();

        res.status(200).send({
            success: true,
            message: 'Service request deleted successfully saved',
        })


    } catch(error){
        next(error);
    }
}

export const patchServiceRequest = async (req, res, next) => {
    try{
        const updateRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        if(!updateRequest){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        res.status(200).send({
            success: true,
            message: 'Service request successfully saved',
        })
    } catch(error){
        next(error);
    }
}

export const updateServiceRequest = async (req, res, next) => {
    try{
        const serviceReq = await ServiceRequest.replaceOne(
            {_id : req.params.id},
            req.body,
            {
                runValidators: true,
            }
        )

        if(!serviceReq){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        res.status(200).send({
            success: true,
            message: 'Service request successfully saved',
        })
    } catch(error){
        next(error);
    }
}

export const updateStatus = async (req, res, next) => {
    try{
        const { serviceStatus } = req.body;


        const updateStatus = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            {serviceStatus},
            {
                new: true,
                runValidators: true,
            }
        )

        if(!updateStatus){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        res.status(200).send({
            success: true,
            message: 'Service request status updated successfully',
        })
    } catch(error){
        next(error);
    }
}

export const updateRatingReview = async (req, res, next) => {
    try{
        const { serviceReview, serviceRating } = req.body;

        const serviceData = await ServiceRequest.findById(req.params.id);
        if(!serviceData){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        if(serviceData.serviceStatus === 'Pending' || serviceData.serviceStatus === 'Cancelled'){
            const error = new Error('Service request is either Pending / Cancelled');
            error.status = 400;
            throw error;
        }

        const updateRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            {serviceReview,
            serviceRating},
            {
                new: true,
                runValidators: true,
            }
        )
        if(!updateRequest){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }

        res.status(200).send({
            success: true,
            message: 'Service request rating and review successfully saved',
        })
    }
    catch(error){
        next(error);
    }
}

export const updatePriceEst = async (req, res, next) => {
    try{
        const {servicePriceEstimation } = req.body;
        const updateRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            {servicePriceEstimation},
            {
                new: true,
                runValidators: true,
            }
        )
        if(!updateRequest){
            const error = new Error('No Service Request');
            error.status = 400;
            throw error;
        }
        res.status(200).send({
            success: true,
            message: 'Service request price updated successfully',
        })
    } catch(error){
        next(error);

    }
}


