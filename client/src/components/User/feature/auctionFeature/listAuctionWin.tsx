import React from "react";
import { Pagination } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import AuctionPendingTable from "src/components/User/feature/auctionFeature/table/auctionPendingTable";
import NoAuctionWin from "src/components/User/feature/auctionFeature/noAuction/noAuctionWin";
import { getAuctionWinsByUserThunk } from "src/redux/sessionAuction/thunk";

interface ListAuctionWinProps {
  currentPage: number;
  totalPages: number;
}

const ListAuctionWin: React.FC<ListAuctionWinProps> = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch<AppDispatch>();
  const auctions = useSelector((state: RootState) => state.auctionWin.getAuctionWinsByUser.auctionWins ?? []);

  const handlePageChange = (page: number) => {
    dispatch(getAuctionWinsByUserThunk({ page }));
  };

  return (
    <>
      {auctions.length > 0 ? (
        <>
          <AuctionPendingTable currentPage={currentPage} />
          {totalPages > 1 && (
            <div className="flex justify-center my-4">
              <Pagination
                isCompact
                loop
                showControls
                color="primary"
                total={totalPages}
                initialPage={currentPage}
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          )}
        </>
      ) : (
        <NoAuctionWin />
      )}
    </>
  );
};

export default ListAuctionWin;
