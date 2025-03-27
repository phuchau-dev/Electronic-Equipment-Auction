// src/types/orderTypes.ts

export interface ShippingInfo {
    userId: string;
    recipientName: string;
    phone: string;
    address: string;
    email: string;
  }
  
  export interface Product {
    productName: string;
    quantity: number;
    productPrice:number;
    image: string;
  }
  
  export interface StatusEnableWinner {
   userInforWinner?: ShippingInfo;  // Thay đổi từ shippingInfo bắt buộc sang tùy chọn
     productDetails: Product;
     state: string, 
    
     winnerPrice: string ,
     auctionWinnerid: string,
     date:string,
  }