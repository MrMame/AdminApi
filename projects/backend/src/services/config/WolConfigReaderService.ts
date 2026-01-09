import dotenv from "dotenv";
import WakeOnLanDeviceInfo from "./../../models/network/WakeOnLanDeviceInfo.js";
import fs from "fs";

export class WolConfigReaderService{

    public static GetWolConfigFromEnv(){
        let devices:WakeOnLanDeviceInfo[] = [];
        
        //const devices = {};

        for (const [key, value] of Object.entries(process.env)) {
        const match = key.match(/^NETWORK_WOL_DEVICE_(MAC|NAME)_(\d+)$/);

            if (match) {
                const [, type, index] = match;
                const idx = Number(index);

                if (!devices[idx]) {
                    devices[idx] = new WakeOnLanDeviceInfo();
                }

                if (type === "MAC") {
                devices[idx].mac = value?value:"";
                } else if (type === "NAME") {
                devices[idx].name = value?value:"";
                }
            }
        }

        // In Array umwandeln, sortiert nach Index
        const deviceArray = Object.keys(devices)
        .sort((a, b) => Number(a) - Number(b))
        .map((validateHeaderName,i) => devices[i]);

        console.log(deviceArray);
        return deviceArray;
    }
}