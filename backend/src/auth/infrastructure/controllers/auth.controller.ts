import { Controller, Post, Body, UseGuards, Request, HttpStatus, HttpCode } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/application/auth.service";
import { UserService } from "src/user/application/user.service";
import { User } from "src/domain/entities/user.entity";
import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginDto } from "../dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cria um novo usuário (o primeiro será ADMIN).' })
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
    @ApiResponse({ status: 409, description: 'E-mail já está em uso.' })
    async register(@Body() registerDto: RegisterUserDto) {
        const usersCount = await this.userService.countUsers();
        const role = usersCount === 0 ? 'admin' : 'employee';

        const user = await this.userService.registerUser(registerDto.email, registerDto.password, role);

        const { passwordHash, ...result } = user;
        return { message: "Usuário registrado com sucesso.", data: result };
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'Faz o login e retorna o token de acesso JWT.' })
    @ApiResponse({ status: 201, description: 'Login bem-sucedido e token retornado.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    async login(
        @Body() loginDto: LoginDto,
        @Request() req: any) {
        return this.authService.login(req.user)
    }
}