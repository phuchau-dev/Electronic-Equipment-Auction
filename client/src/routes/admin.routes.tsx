import React from "react";
import { RouteObject } from "react-router-dom";
import Admin from "src/page/Admin/Home/home";
const Dashboard = React.lazy(() => import("src/page/Admin/rootAdmin"));
import TitleAdmin from "src/common/title/TitleAdmin";
const AdminAddCategories = React.lazy(
  () => import("src/page/Admin/categories/addCategories")
);
const AdminEditCategories = React.lazy(
  () => import("src/page/Admin/categories/editCategories")
);
const AdminListCategories = React.lazy(
  () => import("src/page/Admin/categories/listCategories")
);

/**ProductsV2 */
const AdminAddProductV2 = React.lazy(
  () => import("src/page/Admin/product/add/add")
);
const AddPostProduct = React.lazy(
  () => import("src/page/Admin/post/add/addPostProduct")
);
const AdminEditPost = React.lazy(
  () => import("src/page/Admin/post/edit/editPost")
);
const AdminFetAddCategoriesPost = React.lazy(
  () => import("src/page/Admin/post/add/addCategoriesPost")
);
const AdminFetCategoryPostList = React.lazy(
  () => import("src/page/Admin/post/list/getCategoryPostList")
);
const AdminFetPostList = React.lazy(
  () => import("src/page/Admin/post/list/getListPost")
);
const AdminFetAddProductAuction = React.lazy(
  () => import("src/page/Admin/product/add/addAuction")
);
const AdminFetDeleteListProductAuction = React.lazy(
  () => import("src/page/Admin/product/list/getDeleteListAuction")
);
const AdminAddVariant = React.lazy(
  () => import("src/page/Admin/product/variant/addVariant")
);
const AdminFetEditVariant = React.lazy(
  () => import("src/page/Admin/product/edit/editVariant")
);
const AdminFetAddImageVariant = React.lazy(
  () => import("src/page/Admin/product/add/addImageVariant")
);
const AdminFetEditImageVariant = React.lazy(
  () => import("src/page/Admin/product/edit/editImageVariant")
);
const AdminListProductV2 = React.lazy(
  () => import("src/page/Admin/product/list/list")
);
const AdminFetVariantsByProductId = React.lazy(
  () => import("src/page/Admin/product/list/getVariantsByProductId")
);
const AdminFetImageByVariantId = React.lazy(
  () => import("src/page/Admin/product/list/getImageByVariantId")
);
const AdminFetListProductAuction = React.lazy(
  () => import("src/page/Admin/product/list/listAuction")
);
const AdminEditProductV2 = React.lazy(
  () => import("src/page/Admin/product/edit/edit")
);
const AdminFetEditProductAuction = React.lazy(
  () => import("src/page/Admin/product/edit/editAuction")
);
//attribute
const AdminAddScreen = React.lazy(
  () => import("src/page/Admin/attribute/add/addScreen")
);
const AdminListScreen = React.lazy(
  () => import("src/page/Admin/attribute/list/getListScreen")
);
const AdminEditScreen = React.lazy(
  () => import("src/page/Admin/attribute/edit/editScreen")
);
const AdminAddRam = React.lazy(
  () => import("src/page/Admin/attribute/add/addRam")
);
const AdminListRam = React.lazy(
  () => import("src/page/Admin/attribute/list/getListRam")
);
const AdminEditRam = React.lazy(
  () => import("src/page/Admin/attribute/edit/editRam")
);
/**Brands */
const AdminAddBrands = React.lazy(
  () => import("src/page/Admin/brands/addBrands")
);
const AdminEditBrands = React.lazy(
  () => import("src/page/Admin/brands/editBrands")
);
const AdminListBrands = React.lazy(
  () => import("src/page/Admin/brands/listBrands")
);

// Suppliers
const AdminListSuppliers = React.lazy(
  () => import("src/page/Admin/suppliers/listSuppliers")
);
const AdminAddSuppliers = React.lazy(
  () => import("src/page/Admin/suppliers/addSuppliers")
);
const AdminEditSuppliers = React.lazy(
  () => import("src/page/Admin/suppliers/editSuppliers")
);

/**BuyingFormat */
const AdminAddBuyingFormat = React.lazy(
  () => import("src/page/Admin/buyingFormat/addBuyFormat")
);
const AdminEditBuyingFormat = React.lazy(
  () => import("src/page/Admin/buyingFormat/editBuyFormat")
);
const AdminListBuyingFormat = React.lazy(
  () => import("src/page/Admin/buyingFormat/listBuyFormat")
);
/**Comments */
const AdminListComments = React.lazy(
  () => import("src/page/Admin/comments/listComments")
);
const AdminListDetailComments = React.lazy(
  () => import("src/page/Admin/comments/listDetailComments")
);

/**ConditionAuc */

/**CustomerService */
const AdminListCService = React.lazy(
  () => import("src/page/Admin/customerService/listCService")
);

/**discounts */
const AdminAddVoucher = React.lazy(
  () => import("src/page/Admin/vouchers/addVoucher")
);
const AdminEditVoucher = React.lazy(
  () => import("src/page/Admin/vouchers/editVoucher")
);
const AdminListVoucher = React.lazy(
  () => import("src/page/Admin/vouchers/listVoucher")
);
/**Orders */
const AdminListOrder = React.lazy(
  () => import("src/page/Admin/orders/listOrder")
);
const AdminDetailsOrder = React.lazy(
  () => import("src/page/Admin/orders/detailsOrder")
);
/**OrderAuction */
const AdminListOrderAuction = React.lazy(
  () => import("src/page/Admin/ordersAuction/listOrder")
);
const AdminDetailsOrderAuction = React.lazy(
  () => import("src/page/Admin/ordersAuction/detailsOrder")
);

/**productionAuc */
const AdminAddProdAuc = React.lazy(
  () => import("src/page/Admin/productTime/addProductTime")
);
const AdminEditProdAuc = React.lazy(
  () => import("src/page/Admin/productTime/editProductTime")
);
const AdminListProdAuc = React.lazy(
  () => import("src/page/Admin/productTime/list")
);

/**priceRand */
const AdminAddPriceRand = React.lazy(
  () => import("src/page/Admin/priceRand/addPriceRand")
);
const AdminEditPriceRand = React.lazy(
  () => import("src/page/Admin/priceRand/editPriceRand")
);
const AdminListPriceRand = React.lazy(
  () => import("src/page/Admin/priceRand/listPriceRand")
);
/***RecycleBin */
const AdminRecycleBinCate = React.lazy(
  () => import("src/page/Admin/recycleBinCate/allItemList")
);
const AdminRecycleBin = React.lazy(
  () => import("src/page/Admin/recycleBin/SoftDeletedProduct")
);
const AdminRecycleBinOrder = React.lazy(
  () => import("src/page/Admin/orders/recycleBinOrder")
);
const AdminRecycleBinVoucher = React.lazy(
  () => import("src/page/Admin/vouchers/softDelVoucher")
);
const AdminRecycleBinSupplier = React.lazy(
  () => import("src/page/Admin/recycleBinSupplier/SoftDeletedSupplier")
);
const AdminRecycleBinBrand = React.lazy(
  () => import("src/page/Admin/recycleBinBrand/SoftDeletedBrand")
);
const AdminRecycleComment = React.lazy(
  () => import("src/page/Admin/recycleBinComment")
);

const AdminRecybinProductTime = React.lazy(
  () => import("src/page/Admin/productTime/deletedProductTime")
);

const AdminRecybinPriceRand = React.lazy(
  () => import("src/page/Admin/priceRand/deletedPriceRand")
);

/**User */
const AdminListUser = React.lazy(() => import("src/page/Admin/users/listUser"));
const AdminListDeleted = React.lazy(
  () => import("src/page/Admin/users/listDelete")
);
const AdminEditUser = React.lazy(() => import("src/page/Admin/users/editUser"));

// Inbound
const AdminListInbound = React.lazy(
  () => import("src/page/Admin/inbound/listInbound")
);
const AdminAddInbound = React.lazy(
  () => import("src/page/Admin/inbound/addInbound")
);
const AdminEditInbound = React.lazy(
  () => import("src/page/Admin/inbound/editInbound")
);

//Inbound V2
const AdminListInboundV2 = React.lazy(
  () => import("src/page/Admin/inbound/listInboundV2")
);
const AdminAddInboundV2 = React.lazy(
  () => import("src/page/Admin/inbound/addInboundV2")
);
const AdminEditInboundV2 = React.lazy(
  () => import("src/page/Admin/inbound/editInboundV2")
);

//Inventory
const AdminAddInventory = React.lazy(
  () => import("src/page/Admin/inventory/addInventory")
);
const AdminListInventory = React.lazy(
  () => import("src/page/Admin/inventory/listInventory")
);

//Inventory V2
const AdminAddInventoryV2 = React.lazy(
  () => import("src/page/Admin/inventory/addInventoryV2")
);
const AdminListInventoryV2 = React.lazy(
  () => import("src/page/Admin/inventory/listInventoryV2")
);

// OrderAuction
// const AdminListOrderAuction = React.lazy(
//   () => import("../page/Admin/orderAuction/listOrder")
// );
const AdminListRecybinOrderAuction = React.lazy(
  () => import("src/page/Admin/orderAuction/recycleBinOrderAuction")
);

// const AdminDetailOrderAuction = React.lazy(
//   () => import("../page/Admin/orderAuction/detailsOrderAuction")
// );
const AdminDetailOrderAuctionFrCash = React.lazy(
  () => import("src/page/Admin/orderAuction/detailOrderCash")
);

const AdminAucPriceRandList = React.lazy(
  () => import("src/page/Admin/priceRandAuc/listPriceRanAuct")
);
const AdminAucPriceRandAdd = React.lazy(
  () => import("src/page/Admin/priceRandAuc/addPriceRandAuc")
);
const AdminAucPriceRandEdit = React.lazy(
  () => import("src/page/Admin/priceRandAuc/editPriceRandAuct")
);

const AdminAucPriceRandRecy = React.lazy(
  () => import("src/page/Admin/priceRandAuc/listRecyPriceRandAuct")
);

const AdminListCheckAuct = React.lazy(
  () => import("src/page/Admin/auctionCheckDisable/isCheckedAucDisable")
);

const AdminListEnableAuct = React.lazy(
  () => import("src/page/Admin/auctionCheckDisable/isEnableDisabledAuct")
);

const AdminDetalDisableAuct = React.lazy(
  () => import("src/page/Admin/auctionCheckDisable/detailCheckAuct")
);

const AdminDetalEnableAuct = React.lazy(
  () => import("src/page/Admin/auctionCheckDisable/detaiEnableAuct")
);
const AdminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <>
        <TitleAdmin />
        <Dashboard />
      </>
    ),
    children: [
      { index: true, element: <Admin /> },
      { path: "addCategories", element: <AdminAddCategories /> },
      { path: "editCategories/:id", element: <AdminEditCategories /> },
      { path: "listCategories", element: <AdminListCategories /> },
      { path: "addproduct", element: <AdminAddProductV2 /> },
      { path: "add-post-product", element: <AddPostProduct /> },
      { path: "edit-post/:id", element: <AdminEditPost /> },
      { path: "add-categories-post", element: <AdminFetAddCategoriesPost /> },
      { path: "list-categories-post", element: <AdminFetCategoryPostList /> },
      { path: "list-post", element: <AdminFetPostList /> },
      { path: "add-product-auction", element: <AdminFetAddProductAuction /> },
      { path: "list-auction", element: <AdminFetListProductAuction /> },
      {
        path: "delete-list-auction",
        element: <AdminFetDeleteListProductAuction />,
      },
      { path: "product/:productId/addvariant", element: <AdminAddVariant /> },
      { path: "product/:variantId", element: <AdminFetEditVariant /> },
      {
        path: "product/:product_variant_id/add-image-variant",
        element: <AdminFetAddImageVariant />,
      },
      {
        path: "edit-image-and-color/:imageId",
        element: <AdminFetEditImageVariant />,
      },
      { path: "listproduct", element: <AdminListProductV2 /> },
      {
        path: "list-product-variant/:productId",
        element: <AdminFetVariantsByProductId />,
      },
      {
        path: "list-image-and-color/:variantId",
        element: <AdminFetImageByVariantId />,
      },
      { path: "editproduct/:id", element: <AdminEditProductV2 /> },
      {
        path: "edit-product-auction/:id",
        element: <AdminFetEditProductAuction />,
      },
      { path: "add-screen", element: <AdminAddScreen /> },
      { path: "add-ram", element: <AdminAddRam /> },
      { path: "edit-screen/:screenId", element: <AdminEditScreen /> },
      { path: "edit-ram/:ramId", element: <AdminEditRam /> },
      { path: "list-screen", element: <AdminListScreen /> },
      { path: "list-ram", element: <AdminListRam /> },
      { path: "addBrands", element: <AdminAddBrands /> },
      { path: "editBrands/:id", element: <AdminEditBrands /> },
      { path: "listBrands", element: <AdminListBrands /> },
      { path: "listSuppliers", element: <AdminListSuppliers /> },
      { path: "addSuppliers", element: <AdminAddSuppliers /> },
      { path: "editSuppliers/:id", element: <AdminEditSuppliers /> },
      { path: "listInbound", element: <AdminListInbound /> },
      { path: "addInbound", element: <AdminAddInbound /> },
      { path: "listInventory", element: <AdminListInventory /> },
      { path: "addInventory", element: <AdminAddInventory /> },
      { path: "addInventoryV2", element: <AdminAddInventoryV2 /> },
      { path: "listInventoryV2", element: <AdminListInventoryV2 /> },
      { path: "editInbound/:id", element: <AdminEditInbound /> },
      { path: "editInboundV2/:id", element: <AdminEditInboundV2 /> },

      { path: "listInboundV2", element: <AdminListInboundV2 /> },
      { path: "addInboundV2", element: <AdminAddInboundV2 /> },
      { path: "addBuyingFormat", element: <AdminAddBuyingFormat /> },
      { path: "editBuyingFormat", element: <AdminEditBuyingFormat /> },
      { path: "listBuyingFormat", element: <AdminListBuyingFormat /> },
      { path: "listComments", element: <AdminListComments /> },
      { path: "listDetailComments/:id", element: <AdminListDetailComments /> },

      { path: "listCusSer", element: <AdminListCService /> },
      { path: "addVouchers", element: <AdminAddVoucher /> },
      { path: "editVouchers/:id", element: <AdminEditVoucher /> },
      { path: "listVouchers", element: <AdminListVoucher /> },
      { path: "listOrders", element: <AdminListOrder /> },
      { path: "listDetailOrder/:id", element: <AdminDetailsOrder /> },
      { path: "addProdAuc", element: <AdminAddProdAuc /> },
      { path: "editProdAuc/:id", element: <AdminEditProdAuc /> },
      { path: "listProdAuc", element: <AdminListProdAuc /> },

      { path: "addPriceRand", element: <AdminAddPriceRand /> },
      { path: "editPriceRand/:id", element: <AdminEditPriceRand /> },
      { path: "listPriceRand", element: <AdminListPriceRand /> },

      { path: "recycleBin", element: <AdminRecycleBin /> },
      { path: "recycleBinCate", element: <AdminRecycleBinCate /> },
      { path: "recycleBinOrder", element: <AdminRecycleBinOrder /> },
      { path: "recycleBinVoucher", element: <AdminRecycleBinVoucher /> },
      { path: "recycleBinSupplier", element: <AdminRecycleBinSupplier /> },
      { path: "recycleBinBrand", element: <AdminRecycleBinBrand /> },
      { path: "recycleBinComment", element: <AdminRecycleComment /> },
      { path: "recycleBinProducTime", element: <AdminRecybinProductTime /> },
      { path: "recycleBinPriceRand", element: <AdminRecybinPriceRand /> },

      { path: "listUser", element: <AdminListUser /> },
      { path: "listDelete", element: <AdminListDeleted /> },
      { path: "editUser", element: <AdminEditUser /> },
      { path: "OrderAuction", element: <AdminListOrderAuction /> },
      { path: "detailOrderAuction/:id", element: <AdminDetailsOrderAuction /> },
      {
        path: "detailOrderAuctionFrCash/:id",
        element: <AdminDetailOrderAuctionFrCash />,
      },
      { path: "recBinOrderAuction", element: <AdminListRecybinOrderAuction /> },

      { path: "listPriceRandAuct", element: <AdminAucPriceRandList /> },
      { path: "addPriceRandAuct", element: <AdminAucPriceRandAdd /> },
      { path: "editPriceRandAuct/:id", element: <AdminAucPriceRandEdit /> },
      { path: "triggerAuct", element: <AdminAucPriceRandRecy /> },

      { path: "listCheckAuct", element: <AdminListCheckAuct /> },
      { path: "listEnableAuct", element: <AdminListEnableAuct /> },
      { path: "detailDisableCheck/:id", element: <AdminDetalDisableAuct /> },
      { path: "detailEnable/:id", element: <AdminDetalEnableAuct /> },
      { path: "*", element: <Dashboard /> },
    ],
  },
];

export default AdminRoutes;
