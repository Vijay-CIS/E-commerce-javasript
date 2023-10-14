
let shop = document.getElementById("shop");
let items = document.getElementById("items");
const div = document.createElement("div");
div.className="row";
let newRow = items.appendChild(div);



let basket = JSON.parse(localStorage.getItem("data")) || [];

//Arrow Function
let createItems =()=>{
    return (newRow.innerHTML=itemsData.map((x)=>{
        //Object Destruction
        let {id,productName,price,mrp, img} = x;
        let search = basket.find((x)=>x.id === id)||[];
         
        return`
    
    <div class=" col col-sm-3 ">
     
      <div id=productId-${id} class="card mt-3 " >
        <img src="${img}"  class="card-img-top " alt="iphone 13">
        <div class="card-body">
          <h4 class="card-title">${productName}</h4>      
          <div class="price-quantity d-flex flex-column justify-content-between ">
            <div class="price d-flex flex-column">
              <h6 class="text-nowrap ">Price: ₹${price} </h6>
              <h6 class="text-nowrap text-muted text-decoration-line-through"> M.R.P: ₹${mrp} </h6>
            </div>

            <div class="quantity d-flex  align-items-center">
              <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
              <div id=${id} class="quantity p-2">${search.item === undefined ?0 : search.item}</div>

              <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
            </div>
          </div>
          <a href="#" class="btn btn-sm btn-primary">Know more</a>
        </div>
        </div>
      
      
    </div>
    `}).join(""));


}
createItems();



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
// console.log(basket);
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
 
    localStorage.setItem("data",JSON.stringify(basket));
//   console.log(basket);

};


let update = (id) =>{
    
    let search = basket.find((x)=>x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML =search.item;
   calculation();
};

let calculation = () =>{

    let cart = document.getElementById('cart');

    let totalItems = cart.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y,0);
    cart.innerHTML = ` Cart: ${totalItems}`;
};

calculation();