  import React, { useState, useEffect } from "react";
  import { Card, CardHeader, CardBody, CardFooter, Avatar, Chip, Alert, Input, Spinner } from "@nextui-org/react";
  import { ProductAuction } from "src/services/detailProductAuction/types/detailAuction";
  import { MyButton } from "src/common/customs/MyButton";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch, RootState } from "src/redux/store";
  import { toast, Toaster } from "react-hot-toast";
  import { useNavigate } from 'react-router-dom';
  import { handleBidSubmission } from "src/components/User/feature/details/detailAuction/handle/handleBidSubmission";
  import { handleBidSubmissionForEnterAuction } from "src/components/User/feature/details/detailAuction/handle/handleBidSubmissionForEnterAuction";
  import socket from 'src/services/rtsk/sk';
  import { convertToVietnameseCurrency } from "src/common/pricecurrency/ConvertToVietnameseCurrency";
  import { getAuctionPricingRangeThunk, getUserCartThunk } from "src/redux/product/client/Thunk";
  import { useForm, SubmitHandler } from "react-hook-form";
  import useNumberFormat from "src/components/User/feature/details/detailAuction/useNumberFormat";

  interface ProductCurrentPriceAndBidpriceProps {
    product: ProductAuction;
    onAuctionEnd: () => void;
    onChange: () => void;
    onChangeTemporary: () => void;
    onChangeTop3Bidder: () => void;
  }


  interface FormValues {
    bidPrice: number;
  }

  const CurrentPriceAndBidprice: React.FC<ProductCurrentPriceAndBidpriceProps> = ({ product, onAuctionEnd, onChange, onChangeTemporary, onChangeTop3Bidder }) => {
    const [priceStep, setPriceStep] = useState<number>(product.auctionPricing.priceStep ?? 0);
    const [currentPrice, setCurrentPrice] = useState<number>(product.auctionPricing.currentPrice ?? 0);
    const [isPriceStepAdjusted, setIsPriceStepAdjusted] = useState<boolean>(false);
    const [userBidPrice, setUserBidPrice] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isAddingPrice, setIsAddingPrice] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit, setValue } = useForm<FormValues>();
    const { value, handleChange } = useNumberFormat();
    const userId = useSelector((state: RootState) => state.auth.profile.profile?._id) || "";
    const roles = useSelector((state: RootState) => state.auth.login.roles);
    const userCart = useSelector((state: RootState) => state.productClient.getUserCart.cart);
    const [maxPrice,setMaxPrice] = useState<number>(product.auctionPricing.maxPrice ?? 0);
    useEffect(() => { setMaxPrice(product.auctionPricing.maxPrice ?? 0); setCurrentPrice(product.auctionPricing.currentPrice ?? 0); }, [product]);
    const handleQuickCalculate = () => {
      const calculatedPrice = maxPrice - currentPrice;
      setValue('bidPrice', calculatedPrice);
      handleChange({ target: { value: calculatedPrice.toString() } } as React.ChangeEvent<HTMLInputElement>);
    };


    useEffect(() => { dispatch(getUserCartThunk()); }, [dispatch]);
    const checkStatusCart = (): number => {
      if (userCart && userCart.user === userId) {
        if (userCart.itemAuction && userCart.itemAuction.length > 0) {
          return 1;
        } else if (userCart.items && userCart.items.length > 0) {
          return 2;
        }
      }
      return 0;
    };
    const statusCart = checkStatusCart();
    const isDisabled = statusCart === 1 || roles.some((role) => role.name === "admin");
    const updateAuctionPricing = async () => {
      const result = await dispatch(getAuctionPricingRangeThunk({ slug: product.slug }));
      if (result.payload && typeof result.payload !== "string") {
        setPriceStep(result.payload.auctionPricing.priceStep ?? 0);
        setCurrentPrice(result.payload.auctionPricing.currentPrice ?? 0);
        setIsPriceStepAdjusted(result.payload.auctionPricing.isPriceStepAdjusted ?? false);
      }
    };

    useEffect(() => {
      updateAuctionPricing();
    }, [product]);

    useEffect(() => {
      socket.on('auctionPriceUpdated', async (data) => {
        if (data.productSlug === product.slug) {
          await updateAuctionPricing();
          if (data.status === 'ended') {
            onAuctionEnd();
          }
        }
      });

      return () => {
        socket.off('auctionPriceUpdated');
      };
    }, [product.slug, onAuctionEnd]);

    useEffect(() => {
      socket.on('bidPlaced', async (data) => {
        if (data.slug === product.slug) {
          await updateAuctionPricing();
          if (data.status === 'ended') {
            onAuctionEnd();
          }
          if (data.status === 'temporary') {
            onChangeTemporary();
          }
          if (data.userId !== userId) {
            toast.success(data.message);
          }
        }
      });

      return () => {
        socket.off('bidPlaced');
      };
    }, [product.slug, userId, navigate]);




    const handleSubmitBidPrice = async () => {
      if (!product.slug) {
        toast.error("Slug của sản phẩm không hợp lệ.");
        return;
      }
      setIsSubmitting(true);
      await handleBidSubmission({ ...product, slug: product.slug as string }, userBidPrice, priceStep, currentPrice, dispatch, userId, setCurrentPrice, setUserBidPrice);
      setIsSubmitting(false);
      onChange();
      onChangeTop3Bidder();
    };

    const handleSubmitBidPriceForm: SubmitHandler<FormValues> = async () => {
      const bidPrice = Number(value.replace(/,/g, ''));
      if (!product.slug) {
        toast.error("Slug của sản phẩm không hợp lệ.");
        return;
      }
      setIsAddingPrice(true);
      const result = await handleBidSubmissionForEnterAuction(
        { ...product, slug: product.slug as string },
        bidPrice,
        priceStep,
        currentPrice,
        dispatch,
        userId,
        setCurrentPrice,
        setUserBidPrice
      );
      setTimeout(() => { setIsAddingPrice(false);}, 3000);
      if (result.success) {
        toast.success(result.msg);
      }
      onChangeTop3Bidder();
    };



    return (
      <>
        <Toaster />
        <Card className="max-w-full shadow-none bg-white">
          <CardHeader className="justify-between">
            <div className="flex gap-2 items-center">
              <Avatar
                radius="full"
                size="sm"
                className="border-none"
                src="https://firebasestorage.googleapis.com/v0/b/xprojreact.appspot.com/o/icon%2FOrange%20White%20Modern%20Gradient%20%20IOS%20Icon.svg?alt=media&token=295557b9-f375-481d-be0a-fe85951aa160"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-bold leading-none text-default-600">Giá hiện tại</h4>
              </div>
            </div>

            <MyButton radius="full" size="xl" variant="transparent">
              {(currentPrice || 0).toLocaleString()} đ
            </MyButton>
          </CardHeader>

          <CardBody className="px-3 py-4 text-small text-default-400">
            <div className="flex justify-between items-center gap-4">
              <div className="inline-flex items-center gap-2">
                <span className="text-default-600 text-medium font-bold">Bước giá:</span>
                <Chip className="px-3 py-1 text-sm font-bold rounded-md border-none" isDisabled>
                  {convertToVietnameseCurrency(priceStep)}
                </Chip>
              </div>

              <MyButton radius="full" size="sm" variant="gradient">
                {userBidPrice !== null
                  ? userBidPrice.toLocaleString() + " đ"
                  : priceStep.toLocaleString() + " đ"}
              </MyButton>
            </div>
            <div className="mt-2">
              {isPriceStepAdjusted && (
                <Alert
                  hideIcon
                  color="warning"
                  description="Do quá trình đấu giá tạo ra số lẻ nên hệ thống sẽ điều chỉnh lại bước giá."
                  title="Chú ý"
                  variant="faded"
                />
              )}
            </div>

            <MyButton
            radius="full"
            size="xl"
            variant="gradientBlue"
            className="mt-4"
            onClick={handleSubmitBidPrice}
            isDisabled={isDisabled || isSubmitting}
          >
            {isSubmitting ? <Spinner size="sm" color="white" /> : `Ra giá ${(currentPrice + (userBidPrice !== null ? userBidPrice : priceStep)).toLocaleString()} đ`}
          </MyButton>
          </CardBody>

          <CardFooter className="px-3 py-4 text-small text-default-400">
            <form className="w-full justify-between items-center" onSubmit={handleSubmit(handleSubmitBidPriceForm)}>
              <div className="flex w-full items-center gap-2">
                <Input
                  isClearable
                  labelPlacement="outside"
                  type="text"
                  className="my-custom-form my-custom-form-text"
                  placeholder="0.00"
                  variant="underlined"
                  color="success"
                  isDisabled={isDisabled || isAddingPrice}
                  {...register("bidPrice", {
                    required: true,
                    setValueAs: (value) => {
                      const valueAsString = String(value);
                      return Number(valueAsString.replace(/,/g, ''));
                    }
                  })}
                  value={value}
                  onChange={(e) => {
                    handleChange(e);
                    setValue('bidPrice', Number(e.target.value.replace(/,/g, '')));
                  }}
                  onClear={() => {
                    setValue('bidPrice', 0); // Đảm bảo giá trị được truyền là số
                    handleChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
                <MyButton color="primary" size="md" variant="gradientBlue" onClick={handleQuickCalculate}>
                  Tính nhanh
                </MyButton>
                <MyButton color="danger" size="md" type="submit" variant="gradientBlue" isDisabled={isDisabled || isAddingPrice}>
                {isAddingPrice ? <Spinner size="sm" color="white" /> : "Thêm giá"}
                </MyButton>
              </div>
            </form>
          </CardFooter>
        </Card>
      </>
    );
  };

  export default CurrentPriceAndBidprice;
