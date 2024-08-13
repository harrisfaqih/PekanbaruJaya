const { responseReturn } = require("../../utiles/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");
const formidable = require("formidable");

class productController {
  add_product = async (req, res) => {
    //const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand,
      } = field;
      const { images } = files;
      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: false,
      });

      try {
        let allImageUrl = [];
        // for (let i = 0; i < images.length; i++) {
        //   const result = await cloudinary.uploader.upload(images[i].filepath, {
        //     folder: "products",
        //   });
        //   allImageUrl = [...allImageUrl, result.url];
        // }
        if (Array.isArray(images)) {
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(
              images[i].filepath,
              { folder: "products" }
            );
            allImageUrl = [...allImageUrl, result.url];
          }
        } else {
          const result = await cloudinary.uploader.upload(images.filepath, {
            folder: "products",
          });
          allImageUrl = [result.url];
        }

        await productModel.create({
          //sellerId: Id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand.trim(),
        });
        responseReturn(res, 201, { message: "Product Added Successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }

      // if (files.images && files.images.length > 0) {
      //   console.log(files.images[0]);
      // } else {
      //   console.log(files.images);
      // }
      // console.log(field);
    });
  };
  //end metode

  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parseInt(parPage))
          .sort({ createAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parseInt(parPage))
          .sort({ createAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // end methode

  product_get = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  // end methode

  product_update = async (req, res) => {
    let { name, description, stock, price, discount, brand, productId } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");

    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        stock,
        price,
        discount,
        brand,
        productId,
        slug,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "Product Updated Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // end methode

  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { oldImage, productId } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 400, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });

          // Menghapus gambar lama dari Cloudinary
          const oldImagePublicId = oldImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`products/${oldImagePublicId}`);

          // Mengupload gambar baru ke Cloudinary
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });

          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId, { images });
            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Product Image Updated Successfully",
            });
          } else {
            responseReturn(res, 404, { error: "Image Upload Failed" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };
  // end methode

  product_delete = async (req, res) => {
    const { productId } = req.params;

    try {
      // Temukan produk berdasarkan ID
      const product = await productModel.findById(productId);
      if (!product) {
        return responseReturn(res, 404, { error: "Product not found" });
      }

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: false,
      });

      // Hapus gambar dari Cloudinary jika ada
      if (product.images && product.images.length > 0) {
        const publicIds = product.images.map((image) => {
          // Ambil public ID dari URL gambar
          return image.split("/").pop().split(".")[0]; // Misalnya, "image_id" dari "https://res.cloudinary.com/demo/image/upload/v1234567890/image_id.jpg"
        });
        for (let i = 0; i < publicIds.length; i++) {
          console.log(`Gambar ke-${i + 1} dengan public ID: ${publicIds[i]}`);
        }
        await Promise.all(
          publicIds.map((publicId) =>
            cloudinary.uploader.destroy(`products/${publicIds}`)
          )
        );
      }

      // Hapus produk dari database
      await productModel.findByIdAndDelete(productId);
      responseReturn(res, 200, { message: "Product deleted successfully" });
    } catch (error) {
      //console.log(error.response.data);
      responseReturn(res, 500, { error: error.message });
    }
  };
  // end methode
}

module.exports = new productController();
