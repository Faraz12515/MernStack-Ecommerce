const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const product = require("../models/product");

// Getting Products by Id
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ error: "Product not found" });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//Creating Products
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    //check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let product = new Product(fields);

    // 1Kb = 1000
    // 1mb = 1000000

    // Image Upload //
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 1mb in size" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler });
      }
      res.json({ result, message: "Product created successfully" });
    });
  });
};

//Removing Procuts by userID and productID
exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "Product removed successfully" });
  });
};

//Update products
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    //check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1Kb = 1000
    // 1mb = 1000000

    // Image Upload //
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 1mb in size" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler });
      }
      res.json({ result, message: "Product updated successfully" });
    });
  });
};
