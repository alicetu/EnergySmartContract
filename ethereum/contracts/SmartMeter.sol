pragma solidity ^0.4.24;

contract MeterContractFactory {
    address[] public deployedMeters;

    function createMeterContract(string propertyName, uint contractDate) public {
        address newMeter = new SmartMeter(propertyName, contractDate, msg.sender);
        deployedMeters.push(newMeter);
    }

    function getDeployedMeters() public view returns (address[]) {
        return deployedMeters;
    }
}

contract SmartMeter {
    
    struct Reading {
        uint timestamp;
        uint kWh;
        uint readingBill;
        uint dueDate;
        bool paymentReceived;
    }
    
    address public manager;
    string public property;
    uint public startDate;
    uint public unitPrice;
    Reading[] public readings;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function SmartMeter(string propertyName, uint contractDate, address provider) public {
        manager = provider;
        property = propertyName;
        unitPrice = 20;
        startDate = contractDate;
    }
    
    function sendReading(uint timestamp, uint kWh) public restricted {
        
        uint setDueDate = timestamp + 30;
        uint calculateBill;
        
        if (readings.length > 0) {
            Reading storage lastReading = readings[readings.length - 1];
            calculateBill = unitPrice * (kWh - lastReading.kWh);
        } else {
             calculateBill = unitPrice * kWh;
        }
        
        Reading memory newReading = Reading({
            timestamp: timestamp,
            kWh: kWh,
            readingBill: calculateBill,
            dueDate: setDueDate,
            paymentReceived: false
        });

        readings.push(newReading);
    }

    function payBill(uint index) public payable {
        Reading storage reading = readings[index];

        require (!reading.paymentReceived);

        manager.transfer(reading.readingBill);
        reading.paymentReceived = true;

    }

    function getSummary() public view returns (address, string, uint, uint, uint) {
        return (
            manager,
            property,
            startDate,
            unitPrice,
            readings.length
        );
    }
    
}
