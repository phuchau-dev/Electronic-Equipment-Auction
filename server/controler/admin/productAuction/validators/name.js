const ProducAuction = require('../../../../model/productAuction/productAuction');

const checkProductNameExists = async (productName) => {
  try {
    return await ProducAuction.findOne({ product_name: productName });
  } catch (error) {
    console.error('Lỗi khi kiểm tra tên sản phẩm:', error);
    throw new Error('Không thể kiểm tra tên sản phẩm'); 
  }
};

const isValidProductName = (productName) => {
  return typeof productName === 'string' && productName.trim() !== '';
};

module.exports = {
  checkProductNameExists,
  isValidProductName
};
