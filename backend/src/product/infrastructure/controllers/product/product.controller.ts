import { Controller, Post, Body, Res, HttpStatus, Get, Param, Patch, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { CreateProductDto } from '../../dto/create-product.dto';
import { CreateProductUseCase } from 'src/product/application/use-cases/create-product.use-case';
import { FindAllProductsUseCase } from 'src/product/application/use-cases/find-all-products.use-case';
import { FindProductByIdUseCase } from 'src/product/application/use-cases/find-product-by-id.use-case';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { UpdateProductUseCase } from 'src/product/application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from 'src/product/application/use-cases/delete-product.use-case';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRole } from 'src/auth/roles/user-roles.interface';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBearerAuth, 
} from '@nestjs/swagger';



@Controller('products')
@ApiTags('products')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductController {
    
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly findAllProductsUseCase: FindAllProductsUseCase, 
        private readonly findProductByIdUseCase: FindProductByIdUseCase, 
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
    ) {} 

    @Post()
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cria um novo produto no estoque.' }) 
    @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' }) 
    @ApiResponse({ status: 403, description: 'Proibido. Usuário não tem o papel necessário.' }) 
    async create(@Body() createProductDto: CreateProductDto) {
        const createdProduct = await this.createProductUseCase.execute(createProductDto);
        return { message: 'Produto criado com sucesso!', data: createdProduct };
    }

    @Get()
    @Roles('admin', 'employee')
    @ApiOperation({ summary: 'Retorna a lista completa de produtos.' })
    @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.' })
    async findAll() {
        const products = await this.findAllProductsUseCase.execute();
        return { message: 'Lista de produtos retornada com sucesso.', data: products };
    }

    @Get(':id') 
    @Roles('admin', 'employee')
    async findById(@Param('id') id: string) { 
        const product = await this.findProductByIdUseCase.execute(id);
        return { message: 'Produto retornado com sucesso.', data: product };
    }

    @Patch(':id')
    @Roles('admin')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        const updatedProduct = await this.updateProductUseCase.execute(id, updateProductDto)

        return {
            message: `Produto ${id} atualizado com sucesso.`,
            data: updatedProduct
        };
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        await this.deleteProductUseCase.execute(id);
    }
}


