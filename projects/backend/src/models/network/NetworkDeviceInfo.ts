export default class NetworkDeviceInfo {
    ip: string;
    mac: string;
    vendor: string;

    constructor(ip: string, mac: string, vendor: string) {
        this.ip = ip;
        this.mac = mac;
        this.vendor = vendor;
    }
}
