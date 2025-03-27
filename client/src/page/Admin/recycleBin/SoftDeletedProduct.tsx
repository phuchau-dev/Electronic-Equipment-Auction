import React from "react";
import AdminFetsoftDeleteList from "src/components/Admin/feature/productV2/deletedList";
import { breadcrumbItems, ReusableBreadcrumb } from "src/ultils/breadcrumb/admin";
import ProductSummary from "src/components/Admin/summary/ProductSummary";
const recycleBin: React.FC = () => {
  return (
    <div>
      <ReusableBreadcrumb items={breadcrumbItems.recycleBin} />
      <div className="mb-4 ml-4 col-span-full xl:mb-2">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Danh sách xóa mềm
        </h1>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mb-4 col-span-full xl:mb-2">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <ProductSummary />
            <div className="overflow-x-auto">
              <AdminFetsoftDeleteList />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default recycleBin;
