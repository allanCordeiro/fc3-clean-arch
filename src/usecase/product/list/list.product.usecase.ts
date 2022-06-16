import { ProductInterface } from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputProductListDto, OutpuProductListDto } from "./list.product.dto";

export class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputProductListDto): Promise<OutpuProductListDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);

    }    
}

//TODO: create an generic mapper
class OutputMapper {
    static toOutput(product: ProductInterface[]): OutpuProductListDto {
        return {
            products: product.map(product =>({
                id: product.id,
                name: product.name,
                price: product.price
            })),
        }
    }
}