import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createAuthDto: CreateAuthDto) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(createAuthDto.password, salt);
    const user = await this.prismaService.user.create({
      data: { email: createAuthDto.email, hashPassword },
    });
    const payload = { email: user.email, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async login(user: user) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.hashPassword))) {
      return user;
    }
    return null;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
