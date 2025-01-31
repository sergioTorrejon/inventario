import {
  Injectable,
  Logger,
  LoggerService,
  Scope,
} from '@nestjs/common';

import { AppEndFile } from './helpers/fs';

@Injectable({ scope: Scope.TRANSIENT })
  export class AppLogger implements LoggerService {
    private context?: string;
    public logger = new Logger()
    
    //configura el CONTEXTO o MÓDULO del LOG
    public setContext(context: string): void {
      this.context = context;
      this.logger = new Logger(this.context)
    }

    //Registra eventos de operaciones realizadas
    log(message: string='' ) {
      this.logger.log(message)
      AppEndFile('log',this.context,message)
    }
  
    //Registra eventos con observaciones de operaciones realizadas
    warn( message: string='' ) {
      this.logger.warn(message)
      AppEndFile('warn',this.context,message)
    }
  
    //Registra eventos con errores de operaciones realizadas
    error(message: string='') {
      this.logger.error(message)
      AppEndFile('error',this.context,message)
    }
  
  }

export const logger = new AppLogger()