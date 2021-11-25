import { Request } from "express";
import Product from "../models/products.model";
import { handleErrors } from "../helpers"

interface IError extends Error {
  code?: number;
}

export const _create = async (req: Request) => {
  let {
    name,
    description,
    carModel,
    price,
    offPrice,
    slug,
    quantity,
    active,
    specificDetails,
    photos,
    thumbnail
  } = req.body;
  offPrice = offPrice || price;
  
  let product = new Product({
      name, description, slug, price, offPrice, carModel, quantity, specificDetails, active, photos, thumbnail
  })


  try {
    await product.save();

    return {
        code: 201,
        message: 'Product saved successfully',
        status: "success",
        data: [product]
    }
    
  } catch (err) {
    return handleErrors(err);
  }
};

export const _update = async (req: Request) => {
  let { id } = req.params;
  let {
    name,
    description,
    specificDetails,
    slug,
    price,
    offPrice,
    carModel,
    quantity,
    active,
    photos,
    thumbnail
  } = req.body;

  offPrice = offPrice || price;
  
  let params = {
    name, description, slug, price, offPrice, carModel, quantity, specificDetails, active, photos, thumbnail
  }
  
  try {
    let product = await Product.findByIdAndUpdate(id, params, { new: true, runValidators: true, context: 'query' });
    return {
      code: 200,
      message: "Product updated successfully",
      status: "success",
      data: [product]
    }
    
  } catch (err) {
    return handleErrors(err);
  }
  
};

export const _delete = async (req: Request) => {
  let { id } = req.params;
  try {
      let product = await Product.findByIdAndDelete(id);
      if(!product) {
          let error: IError = new Error("Product was not found");
          error.code = 404;
          throw error;
      }

      return {
          message: "Product was deleted successfully",
          code: 200,
          status: "success",
          data: []
      }

  } catch (err) {
      return handleErrors(err);
  }
};

export const _get = async (req: Request) => {
  let { id } = req.params;

  try {
      let product = await Product.findOne({ _id: id });
      if(!product) {
          let error: IError = new Error("Product not found");
          error.code = 404;
          throw error;
      }

      return {
          code: 200,
          message: "Product is retrieved.",
          status: "success",
          data: [product]
      }
  } catch (err) {
      return handleErrors(err);
  }
}

export const _list = async (req: Request) => {
  try {
      let products = await Product.find({});
      
      if (!products.length) {
          return {
              code: 404,
              message: "No products found",
              status: "error",
              errors: []
          }
      }

      return {
          code: 200,
          message: "Products are fetched.",
          status: "success",
          data: [products]
      }
  } catch (err) {
      return handleErrors(err);
  }
};