import { createClient } from '@u4/adbkit';

// Renamed to follow standard camelCase for function names
async function wakeDevice() {
    // FIX 1: Use 'createClient' (the imported function) instead of 'adb'
    const client = createClient(); 

    try {
        // 1. Get the list of connected devices
        const devices = await client.listDevices();
        
        if (devices.length === 0) {
            console.error('Error: No Android devices found. Is USB Debugging enabled?');
            return;
        }
        

        // 2. Select the first device
        const deviceClient = devices[0].getClient();
        const serial = devices[0].id;
        console.log(`Successfully connected to device: ${serial}`);

        // 3. Send the command to wake the screen
        var command = "input keyevent 26 && input keyevent 82";
        //const command = "input keyevent KEYCODE-WAKEUP"
        // IMPROVEMENT 1: Use execOut for simple commands to get the result immediately as a string
        var output = await deviceClient.execOut(command, 'utf8');

        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(1000);

        command = 'input text 3205 && input keyevent 66'
        output = await deviceClient.execOut(command,'utf8');
        

        console.log(`Command executed: ${command}`);
        
        if (output.trim()) {
             console.log(`Shell Output: ${output.trim()}`);
        }
        
    } catch (err) {
        // FIX 2: Corrected typo 'cosnole' to 'console'
        console.error(`Error: ${err.message}`);
    }
}

wakeDevice();