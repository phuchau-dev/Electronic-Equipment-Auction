
export interface SCREEN {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface CPU {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
export interface RAM {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  size?: number; 
}


export interface COLOR {
  _id: string;
  name: string;
  code: string; 
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  hex: string; 
}


export interface GRAPHICSCARD {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface BATTERY {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface OPERATINGSYSTEM {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface STORAGE {
  _id: string;
  name: string;
  status: string;
  sku: string;
  pid: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}export interface Discount {
  _id: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
  status: string;
  disabledAt: Date | null;
  createdAt: string;
  updatedAt: string;
}
export interface ProductVariant {
  variant_name: string;                
  variant_description: string;         
  variant_price: number;    
  variant_original_price:number;    
  product_discount: Discount;                
  battery: BATTERY[];                    
  color: COLOR[];                   
  cpu: CPU[];                     
  graphicsCard: GRAPHICSCARD[];             
  operatingSystem: OPERATINGSYSTEM[];          
  ram: RAM[];                    
  screen: SCREEN[];                   
  storage: STORAGE;                    
  image?: FileList;                   
  sku: string;                         
  pid: string;                        
  status: 'active' | 'inactive';      
  product: string;                     
  inventory?: string[];                
  _id: string;                         
  createdAt: string;                   
  updatedAt: string;                   
  slug: string;                        
  __v: number;                         
}

interface ProductDiscountClient {
  discountId: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
  status: string;
  disabledAt: string | null; 
}
export interface ProductBrand {
  _id: string;
  name: string;
}
export interface ProductCondition {
  _id: string;
  nameCondition: string;
}
export interface products {
  _id: string; 
  product_name: string;
  product_description: string;
  product_type: { name: string };
  createdAt: string; 
  product_discount: ProductDiscountClient;
  view: number; 
  product_ratingAvg: number; 
  product_supplier: string; 
  product_brand: ProductBrand; 
  product_format: string;
  product_condition: ProductCondition;
  product_quantity: number; 
  product_price: number;
  variants: ProductVariant[];
  product_attributes: { k: string; v: string }[]; 
  weight_g: number; 
  image: string[];
  status: string; 
  slug: string;        
}

export interface Pagination {
  currentPage: number; 
  totalPages: number; 
  hasNextPage: boolean; 
  hasPrevPage: boolean; 
  limit?: number; 
}


export interface GetProductsByCategoryResponse {
  slug: string; 
  success: boolean;
  err: number;
  msg: string;
  status: number;
  data: {
    total: number;
    category: string; 
    products: products[];
    brand: ProductBrand[];  
    conditionShopping: ProductCondition[];  
    ram: RAM[];  
    storage: STORAGE[];    
  };
  pagination: Pagination;
  limit?: number;
  }


export interface FilterState {
_sort: string;
page: number;
limit?: number;
brand?: ProductBrand[];
conditionShopping?: ProductCondition[];
ram?: RAM[];
storage?: STORAGE[];
minPrice?: number;
maxPrice?: number;
minDiscountPercent?: number;
maxDiscountPercent?: number;
[key: string]: string | number | ProductBrand[] | ProductCondition[] | RAM[] | STORAGE[] | undefined | string[];
}

export interface QueryParamAuction {
[key: string]: string | number | undefined; 
_sort?: string; 
page?: number; 
limit?: number | string; 
brand?: string; 
ram?: string; 
storage?: string; 
conditionShopping?: string; 
minPrice?: string; 
maxPrice?: string; 
minDiscountPercent?: string; 
maxDiscountPercent?: string; 
}

