module.exports = function(io){
    const Car = require('../models/cars.js')
    var aucPage = io.of('/auction/car').on('connection', function(socket){
        // console.log('Connection established on the server!')
        // socket.emit('auctionUpdate', '<%= car.auction %>');

        socket.on('addBid', async function(data){
            var car = await Car.findById(data.carId);
            

                socket.emit('auctionUpdate', {carId:car._id,carAuct: car.auction, price : data.price})
                socket.broadcast.emit('auctionUpdate', {carId:car._id,carAuct: car.auction, price : data.price})
                socket.emit('allAuctionUpdate', {carId: car._id, price : data.price})
                socket.broadcast.emit('allAuctionUpdate', {carId: car._id, price : data.price})
          
        })

    })
    var aucList = io.of('/auction').on('connection', function(socket){
        // console.log('Connection established on the server!')

    })
    var aucList = io.of('/user/mylist').on('connection', function(socket){
        // console.log('Connection established on the server!')

    })


 


}