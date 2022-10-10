const mongoose = require("mongoose");
const Industry = require( "../models/industry_collab.js" );

//post a industry
const postIndustry = async (req, res) => {
    const { title, image } = req.body;
    
    try {
        const industry = await Industry.create({ title, image });
        res.status(200).json({
            status: "ok",
            message: "Industry added successfully",
            data: industry,
        });
        
    } catch (error) {
        res.status(500).json({
            status: "Internal Server Error",
            message: error.message,
        });
        
    }
}

//get all industry

const getAllIndustry = async (req, res) => {
    try {
        const industry = await Industry.find({});
    
        res.status(200).json(industry);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Internal Error",
            message: error.message,
        });
    }
};

//get industry by id

const getIndustryById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).json({
            status: "internal server error",
            message: "Invalid Industry id.",
        });
    try {
        const industry = await Industry.findById({ _id: id });
        if (!industry)
            return res.status(404).json({
                status: "Not Found",
                message: "Industry not found.",
            });
        res.status(200).json({
            status: "OK",
            message: "Industry successfully found By id",
            data: industry,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update industry by id

const updateIndustryById = async (req, res) => {
    const { id } = req.params;
    const { title, image } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).json({
            status: "internal server error",
            message: "Invalid Industry id.",
        });
    try {
        const industry = await Industry.findByIdAndUpdate(
            { _id: id },
            { title, image },
            { new: true }
        );
        if (!industry)
            return res.status(404).json({
                status: "Not Found",
                message: "Industry not found.",
            });
        res.status(200).json({
            status: "OK",
            message: "Industry successfully updated By id",
            data: industry,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete industry by id

const deleteIndustryById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).json({
            status: "internal server error",
            message: "Invalid Industry id.",
        });
    try {
        const industry = await Industry.findByIdAndDelete({ _id: id });
        if (!industry)
            return res.status(404).json({
                status: "Not Found",
                message: "Industry not found.",
            });
        res.status(200).json({
            status: "OK",
            message: "Industry successfully deleted By id",
            data: industry,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postIndustry,
    getAllIndustry,
    getIndustryById,
    updateIndustryById,
    deleteIndustryById
};

