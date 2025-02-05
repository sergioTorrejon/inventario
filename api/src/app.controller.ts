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
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNjY1ZTA0YS1jOWE4LTQxMGItYWMyOS0zMTU0ODVmYTMzYjkiLCJpYXQiOjE3Mzg3Nzc2NzcsInN1YiI6InN0b3JyZWpvbiIsInVzZXJuYW1lIjoic3RvcnJlam9uIiwidWlkIjoxMTUsImNvbXBhbnkiOiJBUFMiLCJyb2xlIjpbIm9wZXJhZG9yIiwiYWRtaW5pc3RyYWRvciIsImNvbnN1bHRhIl0sIm5iZiI6MTczODc3NzY3NiwiZXhwIjoyNzM4NzgxMjc2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.2mS7fWXN7xhO91czr-zF5j9FzlFVXEn5F4PYYQhd4Uw",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'operador_funcionarios_101'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6InN0b3JyZWpvbiIsInVzZXJuYW1lIjoic3RvcnJlam9uIiwidWlkIjoyNTAsImNvbXBhbnkiOiIxMDEiLCJyb2xlIjpbIm9wZXJhZG9yX2Z1bmNpb25hcmlvcyJdLCJuYmYiOjE2Njc5Njg1NTAsImV4cCI6MjY3Nzk3OTE1MCwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0.SKlR7t3XDE15Bx-EsYT3sVra8fyJywNN4wOdKEgxdV8",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'operador_funcionarios_109'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IjEwOSIsInJvbGUiOlsib3BlcmFkb3JfZnVuY2lvbmFyaW9zIl0sIm5iZiI6MTY2Nzk2ODU1MCwiZXhwIjoxNjc3OTc5MTUwLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.XZMUIe4MAuwCORT4lprkbzUnexfqHhbVrsbHdQR8Epw",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'consulta_funcionarios_101'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IjEwMSIsInJvbGUiOlsiY29uc3VsdGFfZnVuY2lvbmFyaW9zIl0sIm5iZiI6MTY2Nzk2ODU1MCwiZXhwIjoxNjc3OTc5MTUwLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.7dTdpMsP-_z-y9hs7RAyUEKyLJrgAzi9FZIzZSucvQY",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else{
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IkFQUyIsInJvbGUiOlsiZmFrZSIsImZha2UwIl0sIm5iZiI6MTY2Nzk2ODU1MCwiZXhwIjoxNjc3OTc5MTUwLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.MkQyhRFcRQZbCF55xY2QbWFykfACDobjV5LTd5D5pZU",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
  }


}



