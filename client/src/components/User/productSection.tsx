import React, { useEffect, useState } from "react";
import { homeAllProduct } from "src/services/product_v2/client/homeAllProduct";
// import currencyFormatter from "currency-formatter";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  addToWatchlistThunk,
  deleteWatchlistThunk,
} from "src/redux/product/wathList/wathlist";
import { ProductAttribute } from "src/services/product_v2/client/types/homeAllProduct";
// import { addProductToCart, fetchCartList } from "../../redux/cart/cartThunk";
const attributesToShow = ["Ram", "Color", "Storage", "Screen", "CPU", "Pin"];

// function formatCurrency(value: number) {
//   return currencyFormatter.format(value, { code: "VND", symbol: "" });
// }
const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [visibleCount, setVisibleCount] = useState(4);
  useSelector((state: RootState) => state.watchlist.items);
  const userId = useSelector(
    (state: RootState) => state.auth.profile.profile?._id
  );
  const [, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  useParams<{ id: string }>();
  const handleShowMore = () => {
    setVisibleCount(products.length); // Show all products
  };

  const handleAddToWatchlist = async (variantId: string) => {
    if (userId) {
      try {
        let resultAction;

        if (isFavorite) {
          resultAction = await dispatch(
            deleteWatchlistThunk({ variantId })
          ).unwrap();
          console.log("Delete result action:", resultAction);

          if (
            !resultAction ||
            typeof resultAction !== "object" ||
            !resultAction._id
          ) {
            setIsFavorite(false);
          } else {
            setIsFavorite(false);
          }
        } else {
          resultAction = await dispatch(
            addToWatchlistThunk({ variantId })
          ).unwrap();
          console.log("Add result action:", resultAction);

          if (
            !resultAction ||
            typeof resultAction !== "object" ||
            !resultAction._id
          ) {
            setError("Lỗi khi thêm vào DS theo doi");
            setIsFavorite(false);
          } else {
            setIsFavorite(true);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("lỗi xử lý ds theo dõi:", err.message);
          setError(err.message);
        } else {
          console.error("Đã xảy ra lỗi không xác định:", err);
          setError("Đã xảy ra lỗi không xác định.");
        }
      }
    } else {
      console.log("User ID or Product ID is missing");
      setError("User ID or Product ID is missing");
    }
  };
  // const handleAddToCart = async (productId: string) => {
  //   if (userId) {
  //     try {
  //       await dispatch(addProductToCart({ userId, productId })).unwrap();
  //       dispatch(fetchCartList());
  //       console.log("Thêm Thành công");
  //     } catch (err) {
  //       console.error("Lỗi thêm giỏ hàng", err);
  //     }
  //   } else {
  //     console.log("chưa login");
  //   }
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await homeAllProduct();
        setProducts(productList.products);
      } catch (error) {
        console.log(`Lỗi: `, error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-50 py-2 antialiased dark:bg-gray-900 md:py-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl uppercase py-10">
          Sản phẩm dành cho bạn
        </h2>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.slice(0, visibleCount).map((product, index) => (
            <div
              key={index}
              className="rounded-md border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="h-56 w-auto">
                <Link to={`/detailProd/${product._id}`}>
                  <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale-0">
                    <a href="#">
                      <img
                        className="rounded-lg"
                        src={product.image[0]}
                        alt={`product ${index + 1}`}
                      />
                    </a>
                  </figure>
                </Link>
              </div>
              <div className="pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  {/* {product.product_discount.discountPercent> 0 ? (
                    <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                      Giảm giá {product.product_discount.discountPercent || ''}%
                    </span>
                  ) : (
                    <span className="me-2 rounded px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"></span>
                  )} */}
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      data-tooltip-target="tooltip-quick-look"
                      className="flex items-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {product.product_view > 0 ? (
                        <span className="mr-2">({product.product_view})</span>
                      ) : (
                        ""
                      )}

                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                        />
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <span className="sr-only"> Quick look </span>
                    </button>

                    <div
                      id="tooltip-quick-look"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      data-popper-placement="top"
                    >
                      fcdsf Quick look
                      <div className="tooltip-arrow" data-popper-arrow="" />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToWatchlist(product._id)}
                      data-tooltip-target="tooltip-add-to-favorites"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only"> Add to Favorites </span>
                      <svg
                        className={`h-5 w-5 ${
                          isFavorite ? "text-red-500" : "text-gray-500"
                        }`}
                        // className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltip-add-to-favorites"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      data-popper-placement="top"
                    >
                      Add to favorites
                      <div className="tooltip-arrow" data-popper-arrow="" />
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-md font-semibold leading-tight text-gray-900 hover:text-balance dark:text-white"
                >
                  {product.product_name}
                </a>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    5.0
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {" "}
                    <div className="flex gap-1 text-sm text-yellow-400">
                      {Array.from({ length: product.rating }, (_, i) => (
                        <span key={i}>
                          <i className="fa-solid fa-star"></i>
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 items-center m-3">
                      {product.product_quantity > 0
                        ? `(Còn ${product.product_quantity} sản phẩm)`
                        : " "}
                    </div>
                  </p>
                </div>
                <ul className="mt-2 flex items-center gap-4">
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Giao hàng
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Giá tốt
                    </p>
                  </li>
                </ul>
                <div className="mt-4 flex items-center justify-between gap-6">
                  <p className="text-xs leading-tight text-gray-900 dark:text-white">
                    {/* {product.product_discount.discountPercent > 1 ? (
                      <div>
                        <p className="text-xs font-medium text-rose-700">
                          {formatCurrency(
                            product.product_price *
                              (1 -
                                product.product_discount.discountPercent / 100)
                          )}
                          đ
                        </p>
                        <p className="text-xs font-medium line-through text-gray-400">
                          {formatCurrency(product.product_price)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs font-medium text-rose-700">
                        {formatCurrency(product.product_price)}đ
                      </p>
                    )} */}
                  </p>
                </div>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <div className="mt-1 text-sm text-gray-800">
                    {product.product_attributes
                      .filter((attribute: ProductAttribute) =>
                        attributesToShow.includes(attribute.k)
                      )
                      .map((attribute: ProductAttribute, index: number) => (
                        <li key={index} className="mb-1">
                          <strong>{attribute.k}: </strong>
                          <span>{attribute.v}</span>
                        </li>
                      ))}
                  </div>
                </ul>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <div className="mt-1 text-sm text-gray-800">
                    <li>
                      <strong>Khối lượng:</strong>{" "}
                      <span>{product.weight_g} kg</span>
                    </li>
                  </div>
                </ul>

                <div className="mt-4 flex items-center justify-between gap-6">
                  {" "}
                  <button
                    type="button"
                    // onClick={() => handleAddToCart(product._id)}
                    className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    <svg
                      className="-ms-2 me-2 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Thêm vào giỏ hàng
                  </button>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleCount < products.length && (
        <div className="w-full text-center">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            onClick={handleShowMore}
          >
            Xem tiếp
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
