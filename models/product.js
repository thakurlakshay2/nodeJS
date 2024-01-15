const fs = require("fs");
const path = require("path");
const db = require("../util/database");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, content) => {
//     if (!err) {
//       return cb(JSON.parse(content));
//     } else {
//       return cb([]);
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save(cb) {
    db.query(
      "INSERT INTO products (`title`, `price`, `description`, `imageURL`) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl],
      (err, results) => {
        if (err) {
          throw err;
        }
        cb();
      }
    );
    // this.id = Math.random().toString();
    // getProductsFromFile((products) => {
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //     console.log(err);
    //   });
    // });
  }
  static removeProduct(id) {
    getProductsFromFile((product) => {
      const filteredData = product.filter(
        (productData) => productData.id != id
      );

      fs.writeFile(p, JSON.stringify(filteredData), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    // getProductsFromFile(cb);
    db.query("SELECT * FROM products", (err, result) => {
      if (err) {
        throw err;
      }
      return cb(result);
    });
  }
  static findById(id, cb) {
    //     getProductsFromFile((products) => {
    //       cb(products.find((product) => product.id === id));
    // roducts)
    //     });

    db.query(
      "SELECT * FROM products WHERE products.id = ?",
      [id],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result[0]);
        cb(result[0]);
      }
    );
  }
};
