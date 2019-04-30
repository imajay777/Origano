var config = {
    apiKey: "AIzaSyAJgTqulenhqg-w2NpnevLo4g1qg97qozg",
    authDomain: "origano-1a760.firebaseapp.com",
    databaseURL: "https://origano-1a760.firebaseio.com",
    projectId: "origano-1a760",
    storageBucket: "origano-1a760.appspot.com",
    messagingSenderId: "150780361565"
  };
  firebase.initializeApp(config);

//Global
var d= new Date();
var t = d.getTime();
var counter = t;

//Form
// document.getElementById("form").addEventListener("submit", (ee) => {


    function addOrder() {
        var order = document.getElementById("order").value;
        var total = document.getElementById("total").value;
        createOrder(order, total);

     }
    



// } );


//create new order

function createOrder(order, total) { 
    console.log(counter);
    counter += 1;
    console.log(counter);

    var newOrder = {
        id: counter,
        order: order, 
        total: total
    }; 

    let db = firebase.database().ref("order/" + counter);
    db.set(newOrder);
    document.getElementById("cardSection").innerHTML = '';
    readOrder();

    
}



function readOrder() { 
    var order= firebase.database().ref("order/" );
    order.on("child_added", function (data) {
        var orderValue = data.val();
        document.getElementById("cardSection").innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title"> Order: ${orderValue.order}</h5>
                    <p class="card-text"> Total: ${orderValue.total}</p>
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateOrder(${orderValue.id}, '${orderValue.order}', '${orderValue.total}')">
                <i class="fas fa-edit"></i> Edit Order 
                </button>

                <button type="submit" style="color:white" class="btn btn-danger" onclick="deleteOrder(${orderValue.id})">
                <i class="fas fa-trash-alt"></i> Delete Order 
                </button>


        `;
    });
};


function reset() { 
    document.getElementById("firstSection").innerHTML = `
    <div class="border p-4 mb-4" id="form" >
                                <div class="form-group">
                                    <label>Order</label>
                                    <input type="text" class="form-control" id="order" placeholder="Add Order"/>
                                </div>

                                <div class="form-group">
                                        <label>Total</label>
                                        <input type="text" class="form-control" id="total" placeholder="Add Total"/>
                                    </div>


                                    <button  onclick="addOrder()"  id="button1" class="btn btn-success" >
                                            <i class="fas fa-plus"></i>   Add Order
                                        </button>


                                    <button style="display:none"  id="button2" class="btn btn-success" >
                                        Update Order
                                    </button>

                                    <button style="display:none"  id="button3" class="btn btn-danger" >
                                            Cancel
                                        </button>

                            </div>
                            `;


                            
}


function updateOrder(id, order, total) { 
    document.getElementById("firstSection").innerHTML = `
    <form class="border p-4 mb-4" id="form2" >
                                <div class="form-group">
                                    <label>Order</label>
                                    <input type="text" class="form-control" id="order" placeholder="Add Order"/>
                                </div>

                                <div class="form-group">
                                        <label>Total</label>
                                        <input type="text" class="form-control" id="total" placeholder="Add Total"/>
                                    </div>


                                    


                                    <button  id="button2" class="btn btn-success" >
                                        Update Order
                                    </button>

                                    <button id="button3" class="btn btn-danger" >
                                            Cancel
                                        </button>

                            </form>
                            `;

                            document.getElementById("form2").addEventListener("submit", (ee) => {
                                
                                ee.preventDefault();
                                
                            
                            } );

                            document.getElementById("button3").addEventListener("click", (ee) => {
                                
                                    reset();                                
                            
                            } );

                            document.getElementById("button2").addEventListener("click", (ee) => {
                                
                                updateOrder2(id, document.getElementById("order").value, document.getElementById("total").value );                                
                        
                        } );

                        document.getElementById("order").value = order; 
                        document.getElementById("total").value = total; 


}

function updateOrder2(id, order, total) { 
    var orderUpdated = {
        id: counter,
        order: order, 
        total: total
    }; 

    let db = firebase.database().ref("order/" + id);
    db.set(orderUpdated);
    document.getElementById("cardSection").innerHTML = '';
    readOrder();

    reset(); 

}
function deleteOrder(id) { 

    let db = firebase.database().ref("order/" + id);
    db.remove();
    document.getElementById("cardSection").innerHTML = '';
    readOrder();


}
