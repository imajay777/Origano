
  // Initialize Firebase
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
  var products=[];
  var cartItems=[];
  var cart_n = document.getElementById('cart_n');
  //DIVS
  var fruitDIV= document.getElementById("fruitDIV");
  var juiceDIV = document.getElementById("juiceDIV");
  var saladDIV = document.getElementById("saladDIV");
  //INFORMATION
  var FRUIT=[
      {name:"Apple" , price:10},
      {name:"Orange" , price:10},
      {name:"Cherry" , price:10},
      {name:"Strawberry" , price:10},
      {name:"Kiwi" , price:10},
      {name:"Banana" , price:10}
    ];
  var JUICE=[
      {name:"Juice #1" , price:100},
      {name:"Juice #2" , price:110},
      {name:"Juice #3" , price:120}
    ];
  var SALAD=[
    {name:"Salad #1" , price:11},
    {name:"Salad #2" , price:12},
    {name:"Salad #3" , price:150} ];
  //HTML
function HTMLfruitProduct(con){
    let URL = `img/fruits/fruit${con}.jpeg`;
    let btn = `btnFruit${con}`;
    return `
       <div class="col-md-4">
         <div class="card mb-4 shadow-sm">
            <img class="card-img-top" style="height:16rem;" src="${URL}"
            alt="Card image cap">
            <div class="card-body">
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <p class="card-text">${FRUIT[con].name}</p>
            <p class=""card-text">Price: ${FRUIT[con].price}.00</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                 <button type="button" onclick="cart2('${FRUIT[con]
                    .name}','${FRUIT[con].price}','${URL}','${con}','${btn}')" 
                    class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color: inherit">Buy</a></button>

                 <button id="${btn}" type="button" onclick="cart('${FRUIT[con].name}',
                 '${FRUIT[con].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
               </div>
               <small class="text-muted">Free Shipping </small>
              </div>
            
            </div>
         </div>

       </div>
    `
}

function HTMLjuiceProduct(con){
    let URL = `img/juice/juice${con}.jpeg`;
    let btn = `btnJuice${con}`;
    return `
       <div class="col-md-4">
         <div class="card mb-4 shadow-sm">
            <img class="card-img-top" style="height:16rem;" src="${URL}"
            alt="Card image cap">
            <div class="card-body">
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <i style="color:orange;" class="fa fa-star" ></i>
            <p class="card-text">${JUICE[con].name}</p>
            <p class=""card-text">Price: ${JUICE[con].price}.00</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                 <button type="button" onclick="cart2('${JUICE[con]
                    .name}','${JUICE[con].price}','${URL},'${con}','${btn}')" 
                    class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color: inherit">Buy</a></button>

                 <button id="${btn}" type="button" onclick="cart('${JUICE[con].name}',
                 '${JUICE[con].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
               </div>
               <small class="text-muted">Free Shipping </small>
              </div>
            
            </div>
         </div>

       </div>
    `
}


//ANIMATION
function animation() {
	// const toast = swal.mixin({
	// 	toast: true,
	// 	position: 'top-end',
	// 	showConfirmButton: false,
	// 	timer: 1000
	// });

	// toast({
	// 	type: 'success',
	// 	title: 'Added to Shopping Cart'
	// })

	Swal.fire({
  title: 'Added!',
  text: '',
  type: 'success',
  showConfirmButton: false,
  timer : 800
})

}

//CART FUNCTIONS

function cart(name, price, url, con, btncart) {
	var item = {
		name: name,
		price: price, 
		url: `'${url}'`
	};

	cartItems.push(item);
	let storage = JSON.parse(localStorage.getItem("cart"));
	if(storage == null) {
		products.push(item);
		localStorage.setItem("cart", JSON.stringify(products));
	}
	else {
		products = JSON.parse(localStorage.getItem("cart"));
		products.push(item);
		localStorage.setItem("cart", JSON.stringify(products));

	}

	cart_n.innerHTML = `[${products.length}]`;
	document.getElementById(btncart).style.display = "none";
	animation();


}

function cart2(name, price, url, con, btncart) {
	var item = {
		name: name,
		price: price, 
		url: `'${url}'`
	};

	cartItems.push(item);
}



//RENDER
function render(){
   for(let index = 0; index < 6; index++){
       fruitDIV.innerHTML+=`${HTMLfruitProduct(index)}`;
   }
   for(let index = 0; index < 3; index++){
    juiceDIV.innerHTML+=`${HTMLjuiceProduct(index)}`;
   }

   if(localStorage.getItem("cart") == null)
   {

   }
   else
   {
   		products = JSON.parse(localStorage.getItem("cart"));
   		cart_n.innerHTML = `[${products.length}]`;
   }


}