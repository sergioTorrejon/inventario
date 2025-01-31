import { UserDto } from 'src/core/users/classes/user';

import { logger } from '../logger/logger';
import { ResDto } from './classes/res.dto';

export const responseSuccess = ( message:string, data:any=[], userDto?:UserDto ):ResDto =>{
    const res = new ResDto();
        res.success=true,
        res.message=message,
        res.data=data
    logger.setContext(`RES SUCCESS`)
    //logger.log(JsonToStringfi(res))
    logger.log(res.message)
    return res;
}

export const responseError = ( message:string, error:string, data:any=[] , userDto?:UserDto):ResDto =>{
    const res = new ResDto();
        res.success=false,
        res.error=error,
        res.message=message,
        res.data=data
    logger.setContext(`RES`)
    //logger.error(JsonToStringfi(res))
    logger.error(res.message)
    return res;
}