import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify, notifyError } from "src/components/Admin/feature/productV2/toast/msgtoast";
import ReusableBreadcrumb from "src/ultils/breadcrumb/admin/ReusableBreadcrumb";
import { breadcrumbItems } from "src/ultils/breadcrumb/admin/breadcrumbData";
import { ProductVariant, RAM, CPU,GRAPHICSCARD, SCREEN, BATTERY,OPERATINGSYSTEM,STORAGE,ProductVariantResponse } from "src/services/product_v2/admin/types/addVariant";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { editVariantThunk,getOneProductVariantThunk } from "src/redux/product/admin/Thunk";
import { RootState } from "src/redux/store";
import {
  RamSelect,
  ScreenSelect,
  CpuSelect,
  CardSelect,
  BatterySelect,
  StorageSelect,
  OsSelect

} from "src/components/Admin/feature/productV2/selectVariant";
import {
  handleRamChange,
  handleScreenChange,
  handleCPUChange,
  handleCardChange,
  handleBatteryChange,
  handleOsChange,
  handleStorageChange
} from "src/components/Admin/feature/productV2/handlersVariant";
import { SingleValue} from "react-select";
import Productdescription from "src/components/Admin/feature/productAuction/description/product_description";
import FormInput from "src/components/Admin/feature/productV2/Form/forminput";
import FormSelect from "src/components/Admin/feature/productV2/Form/formselect";
import { useFetchData } from "src/components/Admin/feature/productV2/hook/selectFetchData";
const EditVariant: React.FC = () => {
  const { variantId } = useParams<{ variantId: string }>();
  const variantIdString = variantId ?? "";
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductVariant>({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const variant = useSelector((state: RootState) => state.products.getOneProductVariant.variant);
  const [selectedRam, setSelectedRam] = useState<SingleValue<RAM>>(null);
  const [selectedScreen, setSelectedScreen] = useState<SingleValue<SCREEN>>(null);
  const [selectedCPU, setSelectedCPU] = useState<SingleValue<CPU>>(null);
  const [selectedCard, setSelectedCard] = useState<SingleValue<GRAPHICSCARD>>(null);
  const [selectedBattery, setSelectedBattery] = useState<SingleValue<BATTERY>>(null);
  const [selectedOS, setSelectedOs] = useState<SingleValue<OPERATINGSYSTEM>>(null);
  const [selectedStorage, setSelectedStorage] = useState<SingleValue<STORAGE>>(null);
  const onRamChange = (selectedOptions: SingleValue<RAM>) => {
    handleRamChange(selectedOptions, setSelectedRam, setValue);
  };


  const onScreenChange = (selectedOptions: SingleValue<SCREEN>) => {
    handleScreenChange(selectedOptions, setSelectedScreen, setValue);
  };

  const onCPUChange = (selectedOptions: SingleValue<CPU>) => {
    handleCPUChange(selectedOptions, setSelectedCPU, setValue);
  };
  const onCardChange = (selectedOptions: SingleValue<GRAPHICSCARD>) => {
    handleCardChange(selectedOptions, setSelectedCard, setValue);
  };
  const onBatteryChange = (selectedOptions: SingleValue<BATTERY>) => {
    handleBatteryChange(selectedOptions, setSelectedBattery, setValue);
  };
  const onOsChange = (selectedOptions: SingleValue<OPERATINGSYSTEM>) => {
    handleOsChange(selectedOptions, setSelectedOs, setValue);
  };

  const onStorageChange = (selectedOptions: SingleValue<STORAGE>) => {
    handleStorageChange(selectedOptions, setSelectedStorage, setValue);
  };
  const navigate = useNavigate();
  const { discounts } = useFetchData();
  useEffect(() => {
    if (variantId) {
      dispatch(getOneProductVariantThunk(variantId));
    }
  }, [dispatch, variantId]);
  const submitFormEdit: SubmitHandler<ProductVariant> = async (data) => {
    setIsLoading(true);

    try {
      const actionResult = await dispatch(
        editVariantThunk({ variantId: variantIdString, updatedData: data })
      ).unwrap();
      notify(actionResult.msg);
      setTimeout(() => {
        navigate("/admin/listproduct");
      }, 2000);
    } catch (error) {
      notifyError((error as ProductVariantResponse).msg);
    } finally {
      setIsLoading(false);
    }
  };
useEffect(() => {
  if (variant) {
    setValue("variant_name", variant.variant_name);
    setValue("variant_description", variant.variant_description);
    setValue("variant_original_price", variant.variant_original_price);
    setValue("color", variant.color);
  }
}, [variant, setValue]);


  return (
    <form onSubmit={handleSubmit(submitFormEdit)} encType="multipart/form-data">
      <ToastContainer />
      <ReusableBreadcrumb items={breadcrumbItems.addVariant} />
      <div className="mb-4 ml-4 col-span-full xl:mb-2">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Thêm biến thể sản phẩm
        </h1>
      </div>
      <div className="grid grid-cols-1 px-4 pt-4 xl:grid-cols-2 xl:gap-4 dark:bg-gray-900">

        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">Tổng quan sản phẩm</h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                  {...register("variant_name", {
                    required: {
                      value: true,
                      message: "Tên không được để trống",
                    },
                  })}
                />
                {errors.variant_name && (
                  <div className="flex items-center mt-2 text-red-600">
                    <span className="text-sm font-medium">{errors.variant_name.message}</span>
                  </div>
                )}
              </div>

              <FormInput
                id="variant_original_price"
                label="Giá gốc"
                format
                suffix=" đ"
                register={register}
                control={control}
                error={errors.variant_original_price}
                validation={{
                  required: "Giá sản phẩm không được bỏ trống",
                  min: {
                    value: 1000,
                    message: "Giá sản phẩm không thể thấp hơn 1000",
                  },
                  max: {
                    value: 2000000000,
                    message: "Giá sản phẩm không thể vượt quá 2000000000",
                  },
                  valueAsNumber: true,
                }}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setValue("variant_original_price", floatValue ?? 0);
                }}
              />
              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Dung lượng RAM
                </label>
                <RamSelect value={selectedRam} onChange={onRamChange} />
                {errors.ram && (
                  <span className="text-red-600">
                    {errors.ram.message?.toString()}
                  </span>
                )}
              </div>
              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ổ cứng
                </label>
                <StorageSelect value={selectedStorage} onChange={onStorageChange} />
                {errors.storage && (
                  <span className="text-red-600">
                    {errors.storage.message?.toString()}
                  </span>
                )}
              </div>
              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Hệ điều hành
                </label>
                <OsSelect value={selectedOS} onChange={onOsChange} />
                {errors.operatingSystem && (
                  <span className="text-red-600">
                    {errors.operatingSystem.message?.toString()}
                  </span>
                )}
              </div>
              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Màn hình
                </label>
                <ScreenSelect value={selectedScreen} onChange={onScreenChange} />
                {errors.screen && (
                  <span className="text-red-600">
                    {errors.screen.message?.toString()}
                  </span>
                )}
              </div>
              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  CPU
                </label>
                <CpuSelect value={selectedCPU} onChange={onCPUChange} />
                {errors.cpu && (
                  <span className="text-red-600">
                    {errors.cpu.message?.toString()}
                  </span>
                )}
              </div>

              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Card Đồ Họa
                </label>
                <CardSelect value={selectedCard} onChange={onCardChange} />
                {errors.graphicsCard && (
                  <span className="text-red-600">
                    {errors.graphicsCard.message?.toString()}
                  </span>
                )}
              </div>
              <div className="col-span-3 1sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Pin
                </label>
                <BatterySelect value={selectedBattery} onChange={onBatteryChange} />
                {errors.battery && (
                  <span className="text-red-600">
                    {errors.battery.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <FormSelect
                label="Giảm giá"
                id="product_discount"
                options={(discounts ?? []).map((discount) => ({
                  _id: discount._id,
                  name: discount.discountPercent,
                }))}
                register={register}
                validation={{ required: "Giảm giá là bắt buộc" }}
                errorMessage={errors.product_discount?.message}
              />
            <Productdescription register={register} errors={errors} />

            <div className="col-span-6 sm:col-full">
              <button
                type="submit"
                className={`text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Đang thêm...
                  </div>
                ) : (
                  "Cập nhật biến thể"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditVariant;
