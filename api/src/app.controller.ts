import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';


interface token{
  access_token:string;
  token_type:string;
  expires_in:number;
  refresh_token:string;
  check_refresh_token:number;
}


@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/estado")
  getHello() {
    return this.appService.getStatus();
  }

  @Post('token')
  getToken(@Body() data: any): token {
    console.log('data');
    console.log(data);
    if (data.usuario == 'administrador'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNjY1ZTA0YS1jOWE4LTQxMGItYWMyOS0zMTU0ODVmYTMzYjkiLCJpYXQiOjE3Mzg3Nzc2NzcsInN1YiI6InN0b3JyZWpvbiIsInVzZXJuYW1lIjoic3RvcnJlam9uIiwidWlkIjoxMTUsImNvbXBhbnkiOiJBUFMiLCJyb2xlIjpbImFkbWluaXN0cmFkb3IiLCJvcGVyYWRvciIsImNvbnN1bHRhIl0sIm5iZiI6MTczODc3NzY3NiwiZXhwIjoyNzM4NzgxMjc2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.DWGdCRNVcLUeIim8eiXtT5JmVyqCSf0KjbZQUKdqWvU",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'operador'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNjY1ZTA0YS1jOWE4LTQxMGItYWMyOS0zMTU0ODVmYTMzYjkiLCJpYXQiOjE3Mzg3Nzc2NzcsInN1YiI6InN0b3JyZWpvbiIsInVzZXJuYW1lIjoic3RvcnJlam9uIiwidWlkIjoxMTUsImNvbXBhbnkiOiJBUFMiLCJyb2xlIjpbIm9wZXJhZG9yIiwiY29uc3VsdGEiXSwibmJmIjoxNzM4Nzc3Njc2LCJleHAiOjI3Mzg3ODEyNzYsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.3copsEGVr9BMohc58af0JKx0PaFotrfGdA0rps2Qa4c",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'consulta'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNjY1ZTA0YS1jOWE4LTQxMGItYWMyOS0zMTU0ODVmYTMzYjkiLCJpYXQiOjE3Mzg3Nzc2NzcsInN1YiI6InN0b3JyZWpvbiIsInVzZXJuYW1lIjoic3RvcnJlam9uIiwidWlkIjoxMTUsImNvbXBhbnkiOiJBUFMiLCJyb2xlIjpbImNvbnN1bHRhIl0sIm5iZiI6MTczODc3NzY3NiwiZXhwIjoyNzM4NzgxMjc2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.L-lpGsbevayj7dn3tlbqpXU0sDmMw2vuqHQcMN_WLi8",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else{
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNjY1ZTA0YS1jOWE4LTQxMGItYWMyOS0zMTU0ODVmYTMzYjkiLCJpYXQiOjE3Mzg3Nzc2NzcsInN1YiI6InN0b3JyZWpvbiIsInVzZXJuYW1lIjoic3RvcnJlam9uIiwidWlkIjoxMTUsImNvbXBhbnkiOiJBUFMiLCJyb2xlIjpbImFkbWluaXN0cmFkb3IiLCJvcGVyYWRvciIsImNvbnN1bHRhIl0sIm5iZiI6MTczODc3NzY3NiwiZXhwIjoyNzM4NzgxMjc2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.DWGdCRNVcLUeIim8eiXtT5JmVyqCSf0KjbZQUKdqWvU",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
  }
}


