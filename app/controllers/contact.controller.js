const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



exports.create = async (req,res, next)=>{
    if (!req.body?.name) {
        return next(new ApiError(400,"Name can not be empty"));
    }
    try{
        const contactService = new contactService (MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError (500,"An error occurred while creatig the contact")
        );
    }
    
};
//cai dat handler findAll
exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await contactService.findByName(name);
        }else{
            documents = await contactService.find({});

        }
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(documents);
};

// Cài đặt handler findOne:

exports.findOne = async(req, res,next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next (new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }
    catch (error){
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=$req.params.id}`
            )
        );
    }
};

//Cài đặt handler update:

exports.update = async (req , res, next) => {
    if(Object.keys(req.body).length  === 0){
        return next (new ApiError(400, "Data to update can not be empty"));

    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};
//Cài đặt handler delete:

exports.delete = async (req, res, next) =>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({ message: "contact was delete successfully"});

    }catch (error){
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};
//Cài đặt handler deleteAll:
exports.deleteAll = async (_req, res,next) =>{
    try {
        const contactService = new ContactService (MongoDB.client);
        const deleteCount = await contactService.deleteALL();
        return res.send({
            message:`${deletedCount} contacts were deleted successfully`,
        });

    }catch(error){
        return next (
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

        //Cài đặt handler findAllFavorite:
        exports.findAllFavorite = async (_req,res,next) => {
            try {
                const contactService = new contactService(MongoDB.client);
                const documents = await contactService.findAllFavorite();
                return res.send(documents);
            }catch (error){
                return next(
                    new ApiError(
                        500,
                        "An error occurred while retrieving favorite contacts"
                    )
                );
            }
        };

