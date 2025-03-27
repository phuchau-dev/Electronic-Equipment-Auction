import React from "react";
import { UserBanner } from "src/components/User/banner";
import GetBestSell from "src/components/User/best-sellings";
import GetRecommendation from "src/components/User/recommendation";
import ListPhone from "src/components/User/feature/home/listPhone";
import ListLaptop from "src/components/User/feature/home/listLaptop";
import ListAccessory from "src/components/User/feature/home/listAccessory";



const UserHome: React.FC = () => {

  return (
    <div>
      <UserBanner />
      <ListPhone/>
      <ListLaptop/>
      <ListAccessory/>
      <GetRecommendation />
      <GetBestSell />
    </div>
  );
};

export default UserHome;
