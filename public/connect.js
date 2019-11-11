let devices = []

const serviceUUID = 'ef680100-9b35-4933-9b10-52ffa9740042'
const optionalServicesUUID = [
    "ef680200-9b35-4933-9b10-52ffa9740042",
    "ef680300-9b35-4933-9b10-52ffa9740042",
    "ef680400-9b35-4933-9b10-52ffa9740042",
    "ef680500-9b35-4933-9b10-52ffa9740042"
    ]

async function connect() {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{
            services: [serviceUUID],
        }],
        optionalServices: optionalServicesUUID
    })
    if (!devices.includes(device)) {
        devices.push(device)
    }
    if (devices.length == 1) {
        connectFirst(device)    
      }
    else if(devices.length == 2){
        connectSecond(device)
    }
}    

// For the first device, only button characteristic is requested
async function connectFirst(device) {
    const server = await device.gatt.connect()
    const serviceUI = await server.getPrimaryService('ef680300-9b35-4933-9b10-52ffa9740042')
    const characteristicButton = await serviceUI.getCharacteristic('ef680302-9b35-4933-9b10-52ffa9740042')
    characteristicButton.addEventListener('characteristicvaluechanged', handleButtonChange)
    characteristicButton.startNotifications()
    console.log("First device is connected.")
}

// For the second device, only tap characteristic is requested
async function connectSecond(device) {
    const server = await device.gatt.connect()
    const serviceMotion = await server.getPrimaryService('ef680400-9b35-4933-9b10-52ffa9740042')
    const characteristicTap = await serviceMotion.getCharacteristic('ef680402-9b35-4933-9b10-52ffa9740042')
    characteristicTap.addEventListener('characteristicvaluechanged', handleTap)
    characteristicTap.startNotifications()
    console.log("Second device is connected.")
}

function disconnect() {
    for (const device of devices) {
        if (device.gatt.connected) {
            device.gatt.disconnect()
            console.log('Bluetooth device connected: ' + device.gatt.connected)
        } else {
            console.log('Bluetooth device is already disconnected')
        }
    }
    devices = []
}