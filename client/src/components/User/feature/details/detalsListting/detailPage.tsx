import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Star } from "./svg";
import VariantImageGallery from "src/components/User/feature/details/detalsListting/cpnDetailPage/VariantImageGallery";
import FavoriteButton from "src/components/User/feature/details/detalsListting/cpnDetailPage/FavoriteButton";
import AddToCartButton from "src/components/User/feature/details/detalsListting/cpnDetailPage/AddToCartButton";
import VariantName from "src/components/User/feature/details/detalsListting/cpnDetailPage/VariantName";
import VariantPrice from "src/components/User/feature/details/detalsListting/cpnDetailPage/VariantPrice";
import {
    FilterState,
    QueryParamProduct,
} from "src/services/detailProduct/types/getDetailProduct";
import DetailFilters from "src/components/User/feature/details/detalsListting/detaiFilter";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { getProductDetailThunk } from "src/redux/product/client/Thunk";
import NotFoundProduct from "src/error/404/NotFoundProduct";
import RelatedProduct from "src/components/User/feature/details/detalsListting/relatedProduct/relatedProduct";
import Comment from "src/components/User/feature/details/comment/comment";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Blog from "src/components/User/feature/details/detalsListting/blog";
import ProductsInTheSameSegment from "src/components/User/feature/details/detalsListting/productsInTheSameSegment/productsInTheSameSegment";
import { getBreadcrumbPaths } from "src/ultils/breadcrumb/client/getBreadcrumbPaths";
import ReusableBreadcrumb from "src/ultils/breadcrumb/client/reusableBreadcrumb";

// import { ToastContainer } from "react-toastify";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
const DetailPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = queryString.parse(location.search);

    const { productDetail } = useSelector(
        (state: RootState) => state.productClient.getProductDetail
    );
    const variant_name = useSelector(
        (state: RootState) =>
            state.productClient.getProductDetail.productDetail?.product_name
    );
    const category = useSelector(
        (state: RootState) => state.productClient.getProductsByCategory.category
    );
    const [filters, setFilters] = useState<FilterState>({
        storage: queryParams.storage ? String(queryParams.storage) : "",
        color: queryParams.color ? String(queryParams.color) : "",
    });
    const [selectedColor] = useState<string | null>(null);
    useEffect(() => {
        const hasFilters = Object.values(filters).some((value) => value !== "");
        if (!hasFilters) {
            navigate({ pathname: location.pathname });
        } else {
            navigate({
                pathname: location.pathname,
                search: queryString.stringify(filters),
            });
        }
    }, [navigate, filters, location.pathname]);

    useEffect(() => {
        const newQueryParams: QueryParamProduct = {};
        if (filters.storage?.length) {
            newQueryParams.storage = filters.storage;
        }
        if (filters.color?.length) {
            newQueryParams.color = filters.color;
        }

        navigate({
            pathname: window.location.pathname,
            search: queryString.stringify(newQueryParams),
        });
    }, [navigate, filters]);

    useEffect(() => {
        if (slug) {
            dispatch(
                getProductDetailThunk({
                    slug,
                    storage: filters.storage || undefined,
                    color: filters.color || undefined,
                })
            );
        }
    }, [slug, dispatch, filters.storage, filters.color]);

    const handleFilterChange = useCallback(
        (newFilters: FilterState) => {
            setFilters((prevFilters) => {
                const hasStorage = !!productDetail?.variants?.some(
                    (variant) => variant.storage // Kiểm tra xem sản phẩm có `storage`
                );

                if (
                    hasStorage &&
                    newFilters.storage &&
                    newFilters.storage !== prevFilters.storage
                ) {
                    return { ...newFilters, color: "" }; // Reset color nếu storage thay đổi
                }

                return { ...prevFilters, ...newFilters }; // Nếu không có storage, chỉ cập nhật bình thường
            });
        },
        [productDetail]
    );

    const firstVariant = productDetail?.variants?.length
        ? productDetail.variants[0]
        : null;
    if (!productDetail || productDetail.variants?.length === 0) {
        return <NotFoundProduct />;
    }
    const breadcrumbPaths = getBreadcrumbPaths(category, variant_name);

    return (
        <>
            {/* <ToastContainer /> */}
            <ReusableBreadcrumb paths={breadcrumbPaths} />
            <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    {firstVariant && (
                        <>
                            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                <VariantImageGallery
                                    variants={productDetail?.variants || []}
                                    product_name={productDetail?.product_name || ""}
                                    selectedColor={selectedColor}
                                />
                                <div className="mt-6 sm:mt-8 lg:mt-0">
                                    {firstVariant && (
                                        <>
                                            <VariantName
                                                variant={firstVariant}
                                                product={productDetail || {}}
                                            />

                                            <div className="mt-4 sm:flex sm:items-center sm:gap-2 flex-wrap sm:flex-nowrap">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <VariantPrice
                                                        variant={firstVariant}
                                                        product={productDetail || {}}
                                                    />
                                                    {/* <div className="flex items-center text-yellow-400">
                            <span className="ml-1 text-sm font-medium">{averageRating || "0"}</span>
                            <Star />
                          </div> */}

                                                    <p className="ml-2 text-sm font-medium text-gray-900 hover:no-underline dark:text-white">
                                                        {productDetail?.variants?.[0]?.viewCount || 0} Lượt
                                                        xem
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    Mô tả sản phẩm
                                                </h2>
                                                <p className="mt-2 text-gray-700 dark:text-gray-400">
                                                    {productDetail?.product_description ? (
                                                        <Popover placement="top" showArrow={true}>
                                                            <PopoverTrigger>
                                                                <span className="cursor-pointer text-gray-900 dark:text-white">
                                                                    {productDetail.product_description.length >
                                                                        100
                                                                        ? `${productDetail.product_description.substring(
                                                                            0,
                                                                            100
                                                                        )}...`
                                                                        : productDetail.product_description}
                                                                </span>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="max-w-xs right-0">
                                                                <div className="px-4 py-2">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {productDetail.product_description}
                                                                    </p>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : (
                                                        "Không có mô tả cho sản phẩm này."
                                                    )}
                                                </p>
                                            </div>

                                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                                <FavoriteButton />
                                                <AddToCartButton productId={productDetail?._id} />
                                            </div>
                                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                                            <div className="grid grid-cols-1 gap-6 mt-6">
                                                <DetailFilters
                                                    filters={filters}
                                                    onChange={handleFilterChange}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <div className="grid grid-cols-[2fr_1fr] px-4 pt-4 xl:grid-cols-[2fr_1fr] xl:gap-4 dark:bg-gray-900">
                <div className="col-span-full xl:col-auto">
                    <div className="p-1 mb-4 bg-white border border-gray-100 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <Blog
                            post={productDetail.posts}
                            variants={productDetail.variants || []}
                        />
                    </div>
                </div>
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white border border-gray-100 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <ProductsInTheSameSegment />
                    </div>
                </div>
            </div>
            <section>
                <div className="grid grid-cols-1 px-4 pt-4 gap-4 dark:bg-gray-900">
                    <Comment />
                </div>
            </section>
            <section>
                <RelatedProduct />
            </section>
            {/* <ToastContainer /> */}
        </>
    );
};

export default DetailPage;
