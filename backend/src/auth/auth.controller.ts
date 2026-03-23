import { Body, Controller, Post, Headers, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromToken(authHeader: string, secret: string) {
    if (!authHeader) throw new UnauthorizedException('No token provided');
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret });
      return decoded.id;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post('/signup')
  signUp(@Body() signUpDto: any) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  logout(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader, 'access-secret-key');
    return this.authService.logout(userId);
  }

  @Post('/refresh')
  refreshTokens(@Headers('authorization') authHeader: string) {
    
    if (!authHeader) throw new UnauthorizedException('Refresh token required');
    const refreshToken = authHeader.split(' ')[1];
    
    try {
      
      const decoded = this.jwtService.verify(refreshToken, { secret: 'refresh-secret-key' });
      return this.authService.refreshTokens(decoded.id, refreshToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}