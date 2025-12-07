
    //   "mac": "A4:BB:6D:63:A6:29",   // required
    //   "broadcast": "192.168.178.255", // optional, default: 255.255.255.255
    //   "port": 9                      // optional, default: 9


export default class WakeOnLanDeviceInfo{
    mac:string;
    broadcast:string="192.168.178.255";
    port:number=9;
    public constructor(mac:string,broadcast:string,port:number){
        this.mac = mac;
        this.broadcast = broadcast;
        this.port = port;
    }

}