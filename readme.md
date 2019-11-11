# thingy-x2-airtable
This project collects input from two Nordic Thingy:52 devices into an Airtable database via Web Bluetooth and Express server.

When you press the button on the first device the you connected or tap the side of the second device, you should be able to see new rows appearing in your Airtable database.

## Prerequisites
* Node.js
* Express

## Hardware and technologies used
* two Nordic Thingy:52 devices
* Web Bluetooth
* Airtable API
* Express

### Nordic Thingy:52
[Nordic Thingy:52](https://www.nordicsemi.com/Software-and-tools/Prototyping-platforms/Nordic-Thingy-52) is an IoT sensor kit from Nordic Semiconductor.
Useful resource: [Nordic Thingy:52 v2.2.0 Firmware Architecture](https://nordicsemiconductor.github.io/Nordic-Thingy52-FW/documentation/firmware_architecture.html).

### Web Bluetooth
Bluetooth devices can be connected one by one. For each device one characteristic is requested — button for the first one, tap for the second one.

### Airtable
You'll need an [Airtable](https://airtable.com/) account to post the input from your Nordic Thingy:52 devices to your database via [Airtable API](https://airtable.com/api).

The Airtable base should be setup with four fields:
* 'Record ID' (formula, I used 'RECORD_ID()' to get a generated ID)
* 'Thingy ID' (field type 'number')
* 'Action' (field type 'short text')
* 'Action details' (field type 'short text')

You'll need to get your own API key and base ID at https://airtable.com/api. 

In the root folder of the project you'll need to create a file called env.json with the following content:
```
{
   "apiKey": "YOUR API KEY",
   "base": "YOUR BASE ID"
}
```

## Installation
* git clone this project
* create your Airtable database (see above under Airtable)
* create your env.json (see above under Airtable)
* run `npm install`
* run `node server.js`
* open browser on port `8080`
* connect your devices