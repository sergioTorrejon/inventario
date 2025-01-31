import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { appConfig } from '../config/constants';
import { JwtConsultaRoleGuard } from './guards/jwt-consulta-role.guard';
import { JwtOperadorRoleGuard } from './guards/jwt-operador-role.guard';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:appConfig.JWT_SECRET,
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  providers: [JwtStrategy, JwtOperadorRoleGuard, JwtConsultaRoleGuard],
})
export class AuthModule {}