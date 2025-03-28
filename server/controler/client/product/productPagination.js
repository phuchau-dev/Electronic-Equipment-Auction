const Product = require('../../../model/product_v2');

const ProductPaginationService = {
  getProductLimitService: (page, search, limit = 10) => new Promise(async (resolve, reject) => {
    try {
      const offset = (!page || +page <= 1) ? 0 : (+page - 1) * limit;
      const searchQuery = search
        ? {
            status: { $ne: 'disable' },
            product_name: { $regex: search, $options: 'i' }
          }
        : { status: { $ne: 'disable' } };

      const products = await Product.find(searchQuery)
        .skip(offset)
        .limit(limit)
        .populate('product_type', 'name')  
        .populate('product_brand', 'name')
        .populate('product_format', 'name')
        .populate('product_condition', 'name')
        .populate('product_supplier', 'name')
        .select('product_name image product_description product_slug product_discount product_brand product_format product_condition product_supplier product_quantity product_ratingAvg product_view product_price product_price_unit product_attributes weight_g isActive status disabledAt comments')
        .lean();

      const total = await Product.countDocuments(searchQuery); 

      resolve({
        success: true,
        err: 0,
        msg: products.length ? 'OK' : 'No products found.',
        status: 200,
        response: {
          total,
          products
        }
      });

    } catch (error) {
      reject({
        success: false,
        err: 1,
        msg: 'Failed to fetch products: ' + error.message,
        status: 500
      });
    }
  }),
};
module.exports = ProductPaginationService;
