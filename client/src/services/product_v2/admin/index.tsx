import { listProduct } from "src/services/product_v2/admin/list";
import { addProduct } from "src/services/product_v2/admin/add";
import { softDeleteProduct } from "src/services/product_v2/admin/softdelete";
import { getOneProduct } from "src/services/product_v2/admin/getone";
import { updateProductV2 } from "src/services/product_v2/admin/update";
import { getDeletedList } from "src/services/product_v2/admin/deletedList";
import { pagiCrudProduct } from "src/services/product_v2/admin/pagination/pagiCrudProduct";
import { hardDeleteProduct } from "src/services/product_v2/admin/hardDelete";
import { restoreProduct } from "src/services/product_v2/admin/restore";
import { addVariant } from "src/services/product_v2/admin/addVariant";
export {
  listProduct,
  addProduct,
  softDeleteProduct,
  getOneProduct,
  updateProductV2,
  pagiCrudProduct,
  getDeletedList,
  hardDeleteProduct,
  restoreProduct,
  addVariant
};
