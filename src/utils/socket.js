import io from 'socket.io-client'
import { BASE_URL_PRODUCTION } from './constants'

export const createSocketConnection =()=>{
    return io(BASE_URL_PRODUCTION)
}
