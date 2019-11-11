let eventData = [{ 
    thingyID: 0, 
    thingyAction: '',
    actionDetails: ''
}]

document.querySelector('#connect').addEventListener('click', connect);
document.querySelector('#disconnect').addEventListener('click', disconnect);

function handleButtonChange(event) {
    let buttonValue = event.target.value.getUint8()
    // Two events are logged -- for button press and release
    console.log('Button clicked', event)
    console.log(buttonValue)
    eventData[0].thingyAction = 'button clicked'
    eventData[0].thingyID = 1
    eventData[0].actionDetails = 'Value: ' + buttonValue
    // Send request to server
    newEvent(eventData)
}

function handleTap(event) {
    let tapValueDirection = event.target.value.getUint8(0)
    let tapValueCount = event.target.value.getUint8(1)
    console.log('Tap', event)
    console.log('Tap direction: ', tapValueDirection, 'Tap count: ', tapValueCount)
    // Send event data to eventData
    eventData[0].thingyAction = 'tap'
    eventData[0].thingyID = 2
    eventData[0].actionDetails = 'Tap direction: ' + tapValueDirection
    newEvent(eventData)
}

// Send request to server
async function newEvent() {
    const response = await fetch('/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    // Display the server response, which contains the content of the request object
    const displayResponse = await response.text()
    console.log(displayResponse)
}

// Optional: list all existing records
async function runSelect() {
    const response = await fetch('/list-records')
    const allRecords = await response.json()
    console.log('All records:', allRecords)
}

runSelect()