import { createClient } from "@u4/adbkit";

const delay = ms => new Promise(res => setTimeout(res,ms));

async function getDeviceClient(){
    const client = createClient();
    const devices = await client.listDevices();
    if(!devices.length === 0){
        throw new Error("No devices found");
    }
    const deviceClient = devices[0].getClient();
    console.log(`successfully connected to device: ${devices[0].id}`);
    return deviceClient;
}

async function unlockDevice(deviceClient,pin){
    let command = 'input keyevent 26 && input keyevent 82';
    let output = await deviceClient.execOut(command,'utf8');
    await delay(150);
    command = `input text ${pin} && input keyevent 66`;
    output = await deviceClient.execOut(command,'utf8');
}

async function main(){
    let deviceClient;
    try{
        deviceClient = await getDeviceClient();
        await unlockDevice(deviceClient,'3205');
    }
    catch(err){
        console.error(`Error -> ${err.message}`);
    }
}

main();