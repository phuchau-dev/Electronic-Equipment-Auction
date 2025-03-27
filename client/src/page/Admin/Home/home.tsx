import React from "react";
import ProductStatistics from 'src/components/Admin/home/product';
import UserStatistics from 'src/components/Admin/home/user';
import CharCategories from "src/components/Admin/home/categories";
import CharProduct  from "src/components/Admin/home/productCate";
import TopComment from "src/components/Admin/home/topComment";
import Manager from "src/components/Admin/home/manager"
const AdminHome: React.FC = () => {
  return (
    <div className="px-4 pt-6">
      <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {/* Main widget */}
        <ProductStatistics/>
        {/*Tabs widget */}

      </div>

      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">

      <Manager/>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">

      <CharCategories/>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">

      <CharProduct />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">

        <UserStatistics />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">

      <TopComment/>
      </div>
    </div>
  );
};

export default AdminHome;
