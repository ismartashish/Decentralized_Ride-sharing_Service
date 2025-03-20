// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedRideSharing {
    struct Ride {
        address rider;
        address driver;
        uint256 fare;
        bool completed;
    }
    
    mapping(uint256 => Ride) public rides;
    uint256 public rideCounter;
    
    event RideRequested(uint256 rideId, address indexed rider, uint256 fare);
    event RideAccepted(uint256 rideId, address indexed driver);
    event RideCompleted(uint256 rideId, address indexed rider, address indexed driver, uint256 fare);
    
    function requestRide(uint256 _fare) public {
        rideCounter++;
        rides[rideCounter] = Ride(msg.sender, address(0), _fare, false);
        emit RideRequested(rideCounter, msg.sender, _fare);
    }
    
    function acceptRide(uint256 _rideId) public {
        require(rides[_rideId].rider != address(0), "Ride does not exist");
        require(rides[_rideId].driver == address(0), "Ride already accepted");
        
        rides[_rideId].driver = msg.sender;
        emit RideAccepted(_rideId, msg.sender);
    }
    
    function completeRide(uint256 _rideId) public {
        require(rides[_rideId].driver == msg.sender, "Only driver can complete ride");
        require(!rides[_rideId].completed, "Ride already completed");
        
        rides[_rideId].completed = true;
        payable(rides[_rideId].driver).transfer(rides[_rideId].fare);
        emit RideCompleted(_rideId, rides[_rideId].rider, rides[_rideId].driver, rides[_rideId].fare);
    }
}
