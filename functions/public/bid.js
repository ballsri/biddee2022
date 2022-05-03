const form = document.getElementById('bid')
form.addEventListener('submit', bid)
const host = 'https://biddee.herokuapp.com';
const socket = io.connect(host+'/auction/car');

socket.on('auctionUpdate', function(data){
    
    const carId = document.getElementById('carId').value;
    if(carId == data.carId){

        
        var procData =data.carAuct;
        var price = Number(data.price)+Number(3000);
        // console.log(procData)
    
        
        var priceBox = document.getElementById('price')
        if(priceBox != null){
            priceBox.value = price;
            priceBox.min = price;
        }
        document.getElementById('startPrice').value = Number(data.price)+3000;
        document.getElementById('lastPrice').innerHTML = (Number(data.price)).toLocaleString();
        document.getElementById('bidNum').value = data.carAuct.length;
        
        var i = procData.length-1;
        // console.log(procData[i].price);
        var str = ' <tr class="table-border"><td class="b-word text-center py-2"> '
                +(i+1 ) + '</td><td class="b-word text-center py-2">'
                + procData[i].lastname +'</td><td class="b-word text-center py-2 color-green-bid" id = "priceTable'+procData[i].price+'">'
                + (Number(procData[i].price)).toLocaleString() +'</td><td class="b-word text-center py-2">'
                + (new Date(procData[i].time).toLocaleString('en-GB')) +" </td></tr>"
                $('#auctionList').prepend(str);
        document.getElementById('priceTable'+procData[i-1].price).classList.remove('color-green-bid')
        document.getElementById('priceTable'+procData[i-1].price).classList.add('color-red-bid')
        // console.log(procData[i-1].price)
            }
        
})
            
async function bid(event) {
    event.preventDefault()
    const userId = document.getElementById("userId").value;
    const price = document.getElementById('price').value;
    const cur_price = document.getElementById('startPrice').value;
    const carId = document.getElementById('carId').value;
    // console.log(cur_price);
   

        
    if(confirm('Please confirm your bid at '+Number(price).toLocaleString()) == true){
        const result = await fetch('/bid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                price,
                carId,
                cur_price
            })
        }).then((res) => res.json())

        if (result.status === 'ok') {
            // everythign went fine

            socket.emit('addBid', {carId:carId, price: price});
            alert('Your bid has been confirmed!')
            // window.location.href = '/'
            
        } else {
            alert(result.error)
            if(result.code == 1000){
                window.location.href='/auth/login';
            } else if(result.code == 1001){
                window.location.href='/register-bid';
            } else if(result.code == 1001){
                window.location.href='/register-bid';
            }
        }
    }
    
    // })
}