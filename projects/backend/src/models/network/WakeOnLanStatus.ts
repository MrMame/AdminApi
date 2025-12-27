import type WakeOnLanDeviceInfo from "./WakeOnLanDeviceInfo.js";

export default class WakeOnLanStatus{

    error:string|null;
    success:boolean;
    wolDeviceInfo:WakeOnLanDeviceInfo|null;

    public constructor(error:string|null=null,success:boolean=false,wolDeviceinfo:WakeOnLanDeviceInfo|null=null){
        this.error=error;
        this.success=success;
        this.wolDeviceInfo=wolDeviceinfo;
    }



}