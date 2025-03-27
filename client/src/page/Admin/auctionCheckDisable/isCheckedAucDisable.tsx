import React from "react";
import AdminListCheckedAuct
 from "src/components/Admin/feature/auctionCheckDisable/isCheckedAucDisable";
import {
  breadcrumbItems,
  ReusableBreadcrumb,
} from "src/ultils/breadcrumb/admin";

const listProducCheckedPage: React.FC = () => {
  return (
    <div>
      <ReusableBreadcrumb items={breadcrumbItems.listPriceRand} />
      <div className="mb-4 ml-4 col-span-full xl:mb-2">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Danh sách  duyệt
        </h1>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mb-4 col-span-full xl:mb-2">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <AdminListCheckedAuct />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default listProducCheckedPage;