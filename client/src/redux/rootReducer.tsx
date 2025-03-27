import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "src/redux/auth/authSlice";
// import authGoogleReducer from "./auth/googleSlice";
import categoriesSlice from "src/redux/categories/categoriesSlice";
import voucherReducer from "src/redux/discount/voucherSlice";
import { store } from "src/redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import checkoutSlice from "src/redux/checkout/checkoutSlice";
import productAdminReducer from "src/redux/product/admin";
import productClientReducer from "src/redux/product/client";
import auctionWinReducer from "src/redux/sessionAuction";
import postReducer from "src/redux/post";
import attributeReducer from "src/redux/attribute";
import getAttributesReducer from "src/redux/product/attributes";
import listCateNavReducer from "src/redux/clientcate/client";
import watchlistReducer from "src/redux/product/wathList/wathlistSlice";
import cartRenducer from "src/redux/cart/cartSlice";
import countryRenducer from "src/redux/country/provinceSlice";
import VnpayRenducer from "src/redux/pay/vnpaySlice";
import orderRenducer from "src/redux/order/orderSlice";
import productByTimeTrackReducer from "src/redux/timeTrackProduct/timeTrackProdSlice";
import randBidPriceReducer from "src/redux/timeTrackProduct/randBidPrice/randBidPriceSlice";
import biddingReducer from "src/redux/bidding/biddingSlice";
import getRandBidReducer from "src/redux/timeTrackProduct/getRandBidV2/getRandBidSlice";
import serviceRefSlice from "src/redux/servicesRef/serviceRefSlice";
import auctionReducer from "src/redux/auctions/auctionSlice";
import deleteBidReducer from "src/redux/deleteBid/deleteBidSlice";
import auctCheckoutReducer from "src/redux/aucCheckout/auctCheckoutSlice";
import confirmReducer from "src/redux/confirmOrder/confirmOrderSlice";
import OrderListAuctionAdminReducer from "src/redux/orderAucAdmin/getAllOrder/orderAucAdminSlice";
import getDeletedOrderAucAdminReducer from "src/redux/orderAucAdmin/getDeletedAucAdmin/getDeletedSlice";
import statusShippingReducer from "src/redux/statusOrderUser/shippingStatusOrder/shiipingStatusSlice";
import orderAuctionReducer from "src/redux/orderAuction/orderAuctionSlice";
import allLIstOrderStatusReducer from "src/redux/statusOrderUser/allListOrderStatus/allListStatuSlice";
import statusComplteOrderStatusReducer from "src/redux/statusOrderUser/completOrderStatus/completeStatusSlice";
import statusReceiveOrderReducer from "src/redux/statusOrderUser/reciveOrderStatus/receiveStatuSlice";
import softDelOrderStatus from "src/redux/statusOrderUser/softDelByUser/softDellOrderSlice";
import orderPagiReducer from "src/redux/order/pagiOrder/pagislice";
import linkAccountReducer from "src/redux/linkAccount/Slice/linkAccount";
import adminTimeTrackReducer from "src/redux/adminTimeTrack/list/listTimeTrackSlice";
import adminTimeTrackDeletedReducer from "src/redux/adminTimeTrack/deleted/deletedTimeProdSlice";
import adminListPriceRandReducer from "src/redux/adminPriceRand/list/listPriceRandSlice";
import adminDeletedPriceRandReducer from "src/redux/adminPriceRand/deleted/deletedPriceRandSlice";
import pendingStatusOrderReducer from "src/redux/statusOrderUser/pendingStatus/pendingStatusSlice";
import confirmedStatusOrderReducer from "src/redux/statusOrderUser/confirmedStatus/confirmedStatusSlice";
import listBidReducer from "src/redux/listBiddings/listBidSlice";
import mailSoftDelOrderUserReducer from "src/redux/statusOrderUser/MailSoftOrder/mailSoftOrderSlicce";
import BankReducer from "src/redux/auth/bank/bankSlice";
import listBidActiveReducer from "src/redux/listBidActive/listBidActivveSlice";
import listRandAuctReducer from "src/redux/adminPriceRandAuc/listPriceRandAuct/listPriceRandSlice";
import listRandAuctDeletedReducer from "src/redux/adminPriceRandAuc/deletedPriceRandAuct/dletedPriceRandAuctSlice";
import checkAuctWinnerAllReducer from "src/redux/adminCheckAuct/adminCheckAucSlice";
import biddingDetailsSlice from "src/redux/listBiddings/listBidDetails";

import checkAuctEnableAllReducer from "src/redux/adminEnableAuct/enableAuctSlice";
const authConfig = {
  key: "auth",
  storage,
  whitelist: ["login"],
};
const linkAccountConfig = {
  key: "linkAccount",
  storage,
  whitelist: ["linkAccount"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  // authGoogle: persistReducer(authConfig, authGoogleReducer),
  // authGoogle: persistReducer(authConfig, authGoogleReducer),
  linkAccountUser: persistReducer(linkAccountConfig, linkAccountReducer),
  categories: categoriesSlice,
  watchlist: watchlistReducer,
  voucher: voucherReducer,
  checkout: checkoutSlice,
  products: productAdminReducer,
  post:postReducer,
  attribute:attributeReducer,
  productClient: productClientReducer,
  getAttributes: getAttributesReducer,
  cateClients: listCateNavReducer,
  cart: cartRenducer,
  country: countryRenducer,
  Vnpay: VnpayRenducer,
  order: orderRenducer,
  productByTimeTrack: productByTimeTrackReducer,
  randBid: randBidPriceReducer,
  bidding: biddingReducer,
  randBidPrice: getRandBidReducer,
  serviceRef: serviceRefSlice,
  deleteBid: deleteBidReducer,
  auction: auctionReducer,
  auctCheckout: auctCheckoutReducer,
  orderAuction: orderAuctionReducer,
  confirmOrder: confirmReducer,
  orderAucAdmin: OrderListAuctionAdminReducer,
  getDeletedOrderAucAdmin: getDeletedOrderAucAdminReducer,
  statusShippingOrder: statusShippingReducer,
  allListOrderStatus: allLIstOrderStatusReducer,
  completStatusOrder: statusComplteOrderStatusReducer,
  receiveStatusOrder: statusReceiveOrderReducer,
  softDelOrderUser: softDelOrderStatus,
  orderPagi: orderPagiReducer,
  adminTimeTrack: adminTimeTrackReducer,
  adminDeletedTimeProd: adminTimeTrackDeletedReducer,
  adminListPriceRand: adminListPriceRandReducer,
  adminDeltedPriceRand: adminDeletedPriceRandReducer,
  pendingStatusOrder: pendingStatusOrderReducer,
  confirmedStatusOrder: confirmedStatusOrderReducer,
  listBid: listBidReducer,
  mailSoftDelOrderUser: mailSoftDelOrderUserReducer,
  Bank: BankReducer,
  listBidActive: listBidActiveReducer,
  listRandAuct: listRandAuctReducer,
  deletedPriceRand: listRandAuctDeletedReducer,
  auctionWin:auctionWinReducer,
  checkAuctWinnerAll: checkAuctWinnerAllReducer,
  listBidDetails: biddingDetailsSlice,
  enableAuct: checkAuctEnableAllReducer,
  // Add other reducers here to combine them with the persisted state.
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
