import { exec } from "child_process";
import { promisify } from 'util';
import dgram from 'dgram';
import NetworkDeviceInfo  from "../../models/network/NetworkDeviceInfo.js";
import ArpScanner from "../../provider/system/network/ArpScanner.js"
import type WakeOnLanDeviceInfo from "../../models/network/WakeOnLanDeviceInfo.js";
//import WakeOnLanStatus from "./models/network/WakeOnLanStatus.js";
import WakeOnLanStatus from "../../models/network/WakeOnLanStatus.js"

const execAsync = promisify(exec);

export default class LinuxNetworkService{
  
  private _arpScanner:ArpScanner;

  public constructor(arpScanner : ArpScanner){
    this._arpScanner = arpScanner;
  }

  // TODO : Function ReadNetworkStatus muss in LinuxNetworkService verschoben werden.
  public async ReadNetworkStatus(targetName:string, targetMac:string){
    let [errortext, devices] = await this.ScanLocalNetwork();
    // Suche nach dem Gerät mit der angegebenen MAC-Adresse
    let foundDevice:NetworkDeviceInfo | undefined;
    if (errortext!== null || devices === null){
      foundDevice = undefined;
    } else {
      foundDevice = devices.find(d => d.mac.toLowerCase() === targetMac);
    };
    // Erzeuge Ergebnistext
    let responseText:string;
    if(errortext) {
      responseText = `Fehler: ${errortext}`;
    } else if (foundDevice) {
      responseText = `OK - Ist eingeschaltet`;
    } else {
      responseText = `Ausgeschaltet`;
    };
    // Sende Ergebnistext
    return (`'${targetName}' -> ${responseText}`);
  }

  
  public async SendMagicPackage(wolDeviceInfo:WakeOnLanDeviceInfo):Promise<WakeOnLanStatus>{
    let wakeOnLanStatus:WakeOnLanStatus = new WakeOnLanStatus();
    wakeOnLanStatus.wolDeviceInfo = wolDeviceInfo;
    try {
      if (!wolDeviceInfo.mac) {
        wakeOnLanStatus.error= 'mac is required';
        return wakeOnLanStatus;
      }
      
      const packet = this.buildMagicPacket(wolDeviceInfo.mac);
      const socket = dgram.createSocket('udp4');
      
      socket.on('error', (err) => {
        console.error('Socket error:', err);
        socket.close();
      });
      
      // Broadcast erlauben
      socket.bind(() => {
        try {
          socket.setBroadcast(true);
        } catch (e:any) {
          wakeOnLanStatus.error = `setBroadcast failed: ${e}`;
          return;
        }
        socket.send(packet, 0, packet.length, wolDeviceInfo.port, wolDeviceInfo.broadcast, (err) => {
          socket.close();
          if (err) {
            console.error('Send error:', err);
            wakeOnLanStatus.success = false;
            wakeOnLanStatus.error =  err.message;
            return wakeOnLanStatus;
          } else {
            wakeOnLanStatus.success = true;
            return wakeOnLanStatus;
          }
        });
      });
      
    } catch (err:any) {
      console.error(err);
      wakeOnLanStatus.success = false;
      wakeOnLanStatus.error =  err;
      return wakeOnLanStatus;
    }
    return wakeOnLanStatus;
  }
  
  
  // Hilfsfunktion: MAC-String in Buffer (6 Bytes) umwandeln
  private macToBuffer(mac:string) {
    // Erlaubt Trennzeichen : - oder ohne
    const clean = mac.replace(/[^a-fA-F0-9]/g, '');
    if (clean.length !== 12) throw new Error('Ungültige MAC (muss 12 hex Zeichen haben)');
    const bytes = Buffer.alloc(6);
    for (let i = 0; i < 6; i++) bytes[i] = parseInt(clean.substr(i*2, 2), 16);
    return bytes;
  }

  
  private async ScanLocalNetwork(): Promise<[error:string|null, devices:Array<NetworkDeviceInfo>|null]>{
    return await this._arpScanner.scan();
  }
  
  // Magic Packet bauen: 6 x 0xFF gefolgt von MAC x16
  private buildMagicPacket(mac:string) {
    const macBuf = this.macToBuffer(mac);
    const packet = Buffer.alloc(6 + 16 * 6, 0xff);
    for (let i = 0; i < 16; i++) macBuf.copy(packet, 6 + i*6);
    return packet;
  }

}


