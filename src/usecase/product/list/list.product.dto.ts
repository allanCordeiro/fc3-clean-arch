export interface InputProductListDto {}

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutpuProductListDto {
    products: Product[];
}