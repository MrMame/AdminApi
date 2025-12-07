import { exec } from "child_process";
import { promisify } from 'util';
import  NetworkDeviceInfo  from "../../../models/network/NetworkDeviceInfo.js";
import type { promises } from "dns";

const execAsync = promisify(exec);


export default class ArpScanner{

  public constructor(){}

 public async scan(): Promise<[error:string|null, devices:Array<NetworkDeviceInfo>|null]>{
    
    let retDevices  : Array<NetworkDeviceInfo>|null = null;
    let errortext   : string |null                  = null;

    // --localnet = scannt dein Subnetz
    // -l = lokales Netz, -q = weniger Ausgabe
    try {
      const { stdout, stderr } = await execAsync("sudo arp-scan --localnet");
      retDevices = this._parseArpScanOutput(stdout);
      errortext = null;
    }catch (error) {
      retDevices = null;
      errortext = "Netzwerk konnte nicht durchsucht werden";
    }
    return [errortext, retDevices];
  }

  private _parseArpScanOutput(output: string): Array<NetworkDeviceInfo> {
    const devices = output
        .split("\n")
        .map(line => line.trim())
        .filter(line => /\d+\.\d+\.\d+\.\d+/.test(line)) // nur Zeilen mit IP
        .map(line => {
          const parts : string[] = line.split(/\s+/);
          const ip = parts[0];
          const mac = parts[1];
          const vendor = parts.slice(2).join(" ");
          return new NetworkDeviceInfo(
            ip,
            mac,
            vendor
          );
        });
      return devices;
  }

}

