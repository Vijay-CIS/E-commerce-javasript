let label = document.getElementById("label");
let orders = document.getElementById("orders");
let shoppingCart = document.getElementById("shopping-cart");
let totalAmount = document.getElementById("total").children[0];
let  itemName = document.getElementById("total").children[0];



let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () =>{

    let cart = document.getElementById('cart');

    let totalItems = cart.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y,0);
    cart.innerHTML = `Shopping Cart: ${totalItems}`;
};

calculation();


let createCart =() =>{
    
    if(basket.length!==0){

    return (shoppingCart.innerHTML =basket.map((x)=>{
        let {id,item} = x;
        let search = itemsData.find((y)=>y.id === id)||[];
        return`<div class="card">
        <button class="btn-close m-1" ></button>
        <div class="card-body text-center d-flex align-items-center ">
       
          <div class="card-img">
          <img src="${search.img}" width="200" alt="Iphone">
          </div>
         
          <div class="p-3">
        <h4 class="card-title">${search.productName}</h4>      
        <div class="price-quantity d-flex flex-column justify-content-between ">
          <div class="price d-flex flex-column">
            <h6 class="text-nowrap ">Price: ₹${search.price} </h6>
          </div>

          <div class="quantity d-flex  justify-content-center align-items-center">
            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
            <div id=${id} class="quantity p-2">${item === undefined?0:item}</div>

            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
          </div>
        </div>
        <h5 class="">SubTotal (${item}): ₹${item * search.price}</h5>
        <a href="#" class="btn btn-sm btn-success text-nowrap">Proceed to Buy</a>
       
      </div>  
       </div>    
      </div>`;
    }).join(""));
}
    else{
        
        shoppingCart.innerHTML =` `; 
        shoppingCart.appendChild(label);
        label.innerHTML =`<h2 class= text-center m-3> Cart is Empty
        </h2> <a href="index.html" class="btn btn-md btn-primary  d-flex justify-content-around align-item-center">Back to Shop</a>`;
    }
};

createCart();

let createName = () =>{
  if(basket!==0){
  
    let name = basket.map((x)=>{
      let {id, item}=x;
      let search = itemsData.find((y)=>y.id === id)||[];
      return search.productName;
    })
    
    itemName.innerHTML =` <div class="card-header text-center">
    Order Total
    </div>
    <div  class="card-body text-center align-items-center "> ${name}
    
     </div>
    `;
 
  }
  else return;

  
  
  
};

createName();
 


let createTotal = () =>{
    if(basket!==0){
        let amount = basket.map((x)=>{
          let {id, item}=x;
          let search = itemsData.find((y)=>y.id === id)||[];
          return item*search.price;
        }).reduce((x,y)=>x+y,0);
        totalAmount.innerHTML +=` 
        <div class="card-footer text-center align-items-center">
          <h6 class="text-nowrap">Total Amount: ₹${amount} </h6>
          <div class="d-flex text-center justify-content-center ">
          <a href="#" class="btn btn-sm btn-outline-success m-2 text-nowrap">Buy Now</a>
          <a href="#" class="btn btn-sm btn-outline-danger m-2 text-nowrap">Clear Cart</a>
        </div>
        </div>
      `;

      }
else return;
    
    };

createTotal();


let increment = (id)=>{
    let selectedItem = id;
  let search = basket.find((x)=>x.id === selectedItem.id);

  if( search === undefined){
    basket.push({id: selectedItem.id,
        item: 1,
        });
  }
  else{
     search.item +=1;
  }
  createCart();
  createName();
update(selectedItem.id);
localStorage.setItem("data",JSON.stringify(basket));

};



let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id);
    if( search === undefined) return;
    else if( search.item === 0) return;
    else{
       search.item -=1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item!==0);
    createCart();
    createName();
    createTotal();
    localStorage.setItem("data",JSON.stringify(basket));

};


let update = (id) =>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML =search.item;
    calculation();
    createName();
    createTotal();
};



