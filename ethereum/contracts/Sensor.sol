pragma solidity ^0.4.24;

contract Sensor {
    
    struct Reading {
        string timestamp;
        address sender;
        uint temperature;
        uint humidity;
        uint pressure;
    }
    
    address public manager;
    Reading[] public readings;
    
    function Data() public {
        manager = msg.sender;
    }
    
    function sendReading(string timestamp, uint temperature, uint humidity, uint pressure) public {
        Reading memory newReading = Reading({
            timestamp: timestamp,
            sender: msg.sender,
            temperature: temperature,
            humidity: humidity,
            pressure: pressure
        });

        readings.push(newReading);
    }
    
}
