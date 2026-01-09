

export default class WakeOnLanDeviceInfo{
    mac:string;
    broadcast:string="255.255.255.255";
    port:number=9;
    name:string="";
    public constructor(mac:string="",broadcast:string="",port:number=9,name:string=""){
        this.mac = mac;
        this.broadcast = broadcast;
        this.port = port;
        this.name=name;
    }

}