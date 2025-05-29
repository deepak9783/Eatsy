import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;

        // Validate input data
        if (!name || !description || !price || !file) {
            res.status(400).json({
                success: false,
                message: "All fields are required",
            });
            return;
        }

        // Upload image to Cloudinary
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        // Create new menu item
        const menu:any = await Menu.create({
            name,
            description,
            price,
            image: imageUrl,
        });

        // Add menu to the restaurant
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await restaurant.save();
        }

        res.status(201).json({
            success: true,
            message: "Menu added successfully",
            menu,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;

        // Validate input data
        if (!name && !description && !price && !file) {
            res.status(400).json({
                success: false,
                message: "At least one field is required to update the menu",
            });
            return;
        }

        // Find the menu item
        const menu = await Menu.findById(id);
        if (!menu) {
            res.status(404).json({
                success: false,
                message: "Menu not found!",
            });
            return;
        }

        // Update menu fields
        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;

        // Update image if provided
        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }

        await menu.save();

        res.status(200).json({
            success: true,
            message: "Menu updated",
            menu,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};