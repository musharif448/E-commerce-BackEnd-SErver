import { v2 as cloudinary} from 'cloudinary'
import { json } from 'express';
import productModel from "../models/productModel.js"



//function for add product
// const addProduct = async ( req , res ) =>{
//     try {
//         const {name,description, price, category, subCategory, sizes,bestseller } = req.body;
//         const image1 =req.files.image1 && req.files.image1[0];
//         const image2 =req.files.image2 && req.files.image2[0];
//         const image3 =req.files.image3 && req.files.image3[0];
//         const image4 =req.files.image4 && req.files.image4[0];

//         const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)
//         console.log(name,description,price,category,subCategory,sizes,bestseller)
//         console.log(image1,image2,image3,image4)

// //        let imagesUrl = await Promise.all(
// //     images.map(async (item) => { 

// //         //error in these line that block access to my request 
// //         let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
// //         return result.secure_url;
// //     })
// // );

// let imagesUrl = await Promise.all(
//             images.map(async (item) => {
//                 try {
//                     let result = await cloudinary.uploader.upload(item.path, {
//                         resource_type: 'image',
//                     });
//                     return result.secure_url;
//                 } catch (error) {
//                     console.error(`Failed to upload image ${item.path}:`, error.message);
//                     return null; 
//                 }
//             })
//         );

//         // Filter out any null values if an upload failed
//         imagesUrl = imagesUrl.filter(url => url !== null);
//         console.log("Uploaded Image URLs:", imagesUrl);

// let parsedSizes;
// try {
//     // If it's a string, try replacing single quotes with double quotes and parse
//     if (typeof sizes === 'string') {
//         const fixedJsonString = sizes.replace(/'/g, '"');
//         parsedSizes = JSON.parse(fixedJsonString);
//     } else {
//         parsedSizes = sizes; // It's already an array/object
//     }
// } catch (error) {
//     parsedSizes = sizes; // Fallback if parsing completely fails
// }

// const productData = {
//     name,
//     description,
//     category,
//     price: Number(price),
//     subCategory,
//     bestseller: bestseller === "true" ? true : false,
//     sizes : parsedSizes,
//     image: imagesUrl,
//     date: date.now()
// }
// console.log(productData)

// const product = new productMoel(productData);
// await product.save()

// res.json({success:true,message:"product Added"})



        
        
//     } catch (error) {
//         res.json({success : false , message:error.message })
//     }
    
// }

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error(`Failed to upload image ${item.path}:`, error.message);
                    return null; 
                }
            })
        );

        // Filter out any null values if an upload failed
        imagesUrl = imagesUrl.filter(url => url !== null);
        console.log("Uploaded Image URLs:", imagesUrl);

        let parsedSizes;
        try {
            if (typeof sizes === 'string') {
                const fixedJsonString = sizes.replace(/'/g, '"');
                parsedSizes = JSON.parse(fixedJsonString);
            } else {
                parsedSizes = sizes;
            }
        } catch (error) {
            parsedSizes = sizes;
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" || bestseller === true,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        };
        console.log("Product Data to Save:", productData);

        // FIX: Changed 'productMoel' to 'productModel' (Verify this matches your model import name)
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.error("Error in addProduct:", error.message);
        res.json({ success: false, message: error.message });
    }
};

//function for list product
const listProduct = async ( req , res ) =>{
    try {
        const products = await productMoel.find({});
        res.json({success:true,products})
    } catch (error) {
         res.json({success : false , message:error.message })
    }
    
}


//function for removing product
const removeProduct = async ( req , res ) =>{
    try{
        await productMoel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    }catch(error){
         res.json({success : false , message:error.message })
    };
    
    
}


//function for single product info
const singleProduct = async ( req , res ) =>{
    try{
        const { productId } = req.body
    const product = await productMoel.findById(productId)
    res.json({success:true,product})
    }catch(error){
         res.json({success : false , message:error.message })

    }
    
}

export {addProduct,listProduct,removeProduct,singleProduct}