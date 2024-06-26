import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthPipe } from './auth.pipe';
import { Public } from './auth.public';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body(AuthPipe) createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { jwtToken, user } = await this.authService.signup(createAuthDto);
    this.handleCookies(res, jwtToken);
    return user;
  }
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { jwtToken, user } = await this.authService.login(req.user);
    this.handleCookies(res, jwtToken);
    return user;
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.handleCookies(res, '');
    return { message: 'logout successful' };
  }

  async handleCookies(
    @Res({ passthrough: true }) res: Response,
    jwtToken: string,
  ) {
    res.cookie('jwt', jwtToken, { httpOnly: true });
  }

  @Get('isLoggedIn')
  isLoggedIn(@Request() req) {
    return this.authService.isLoggedIn(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Get('test/x')
  @Public()
  getAllNames() {
    const names = ['Alice', 'Bob', 'Charlie']; // Replace with your list of names
    return { names };
  }
}
