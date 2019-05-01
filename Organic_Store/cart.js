
var config = {
    apiKey: "AIzaSyAJgTqulenhqg-w2NpnevLo4g1qg97qozg",
    authDomain: "origano-1a760.firebaseapp.com",
    databaseURL: "https://origano-1a760.firebaseio.com",
    projectId: "origano-1a760",
    storageBucket: "origano-1a760.appspot.com",
    messagingSenderId: "150780361565"
  };
  firebase.initializeApp(config);

//GLOBAL
products = JSON.parse(localStorage.getItem("cart"));
var cartItems = [];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById('table');
var total = 0;

//html
function tableHTML(i) {
	return `
		<tr>
		<th scope="row"> ${i+1} </th>
		<td><img style="width: 90px;" src="${products[i].url}"></td>
		<td>${products[i].name}</td>
		<td>1</td>
		<td>${products[i].price}</td>
		</tr>

	`;


}

function buy() { 
	var d= new Date();
	var t= d.getTime();
	var counter = t;
	counter += 1;

	let db = firebase.database().ref("order/" + counter);
	var items = [];
	for (let i = 0; i < products.length; i++)
		items[i] = { name: products[i].name, price: products[i].price}; 
	let itemdb = {
		id:counter, 
		order:counter-895,
		total:total,
		items:items
	};

	db.set(itemdb);
	Swal.fire({
		position: 'center',
		type: 'success',
		title: 'Purchase made Successfully',
		text: `Your purchase order is: ${itemdb.order}`,
		showConfirmButton:true,
		timer: 50000
	});

	clean();
}

//clean
function clean() { 

	localStorage.clear();
	
	for(let ind = 0; ind < products.length; ind++)
	{
		table.innerHTML += tableHTML(ind);
		total += total + parseInt(products[ind].price);

	}
	total = 0;
	document.getElementById("btnBuy").style.display = "none";
	document.getElementById("btnClean").style.display = "none";


	table.innerHTML = `
		<tr>
		<th scope="row"> </th>
		<th></th>
		<th></th>
		<th><th>
		<th></th>
		</tr>
	`;
	cart_n.innerHTML = '';
	


}


function render() { 

	for(let ind = 0; ind < products.length; ind++)
	{
		table.innerHTML += tableHTML(ind);
		total = total + parseInt(products[ind].price);

	}

	table.innerHTML += `
	<tr>
		<th scope="col"> </th>
		<th scope="col"> </th>
		<th scope="col"> </th>
		<th scope="col"> </th>
		<th scope="col"> Total: $${total}.00 </th>
	</tr>

	<tr>
		<th scope="col"> </th>
		<th scope="col"> </th>
		<th scope="col"> </th>
		<th scope="col">
			<button id="btnClean" onclick="clean()" class="btn text-white btn-warning">Clean shopping cart</button>
		</th>

		<th scope="col">
			<button id="btnBuy" onclick="buy()" class="btn text-white btn-success">Buy</button>
		</th>
	</tr>

	`;

	products = JSON.parse(localStorage.getItem("cart"));
	cart_n.innerHTML = `[${products.length}]`;
}