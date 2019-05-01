var config = {
    apiKey: "AIzaSyAJgTqulenhqg-w2NpnevLo4g1qg97qozg",
    authDomain: "origano-1a760.firebaseapp.com",
    databaseURL: "https://origano-1a760.firebaseio.com",
    projectId: "origano-1a760",
    storageBucket: "origano-1a760.appspot.com",
    messagingSenderId: "150780361565"
  };
  firebase.initializeApp(config);


  function renderTable() { 

    $('#table_items').hide();
           $('#table_orders').show();
           $('#backBtn').hide();
    var order= firebase.database().ref("order/" );

    document.getElementById("table_orders_body").innerHTML = '';
    order.on("child_added", function (data) {
        var orderValue = data.val();

        console.log(orderValue);
        var items = JSON.stringify(orderValue.items);

        console.log(items);
        document.getElementById("table_orders_body").innerHTML += 
            '<tr>'+
            '<td>' + orderValue.id + '/td>'+
            '<td>' + orderValue.order + '</td>'+
            '<td>' + orderValue.total  + '</td>'+
            '<td><button  onclick="showItems(' + orderValue.id + ')"  id="button1" class="btn btn-success">'+
              'View Items'+ 
        '</button></td>'+
            '</tr>';

        $('.view_items').click(function() {
            console.log(items);
        });
        // document.getElementsByClassName("view_items"));
    });


    


};

function showItems(id) { 
    var order= firebase.database().ref("order/" + id + "/" + 'items');


    document.getElementById("table_items_body").innerHTML = '';
    order.on("child_added", function (data) {
        var orderValue = data.val();

           $('#table_items').show();
           $('#table_orders').hide();
           $('#backBtn').show();
           document.getElementById("table_items_body").innerHTML += `
                <tr>
                <td>${orderValue.name} </td>
                <td>${orderValue.price} </td>
                </tr>
            `; 


    
    });
}; 
    





