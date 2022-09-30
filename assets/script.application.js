// ----------- CART RENDERING FN -------------
const cartRenderingFn=(data)=>{
    const productContainer=document.querySelector('.product-container');
    productContainer.innerHTML=""
    const subtotalContainer=document.querySelector(".form-subtotal");
    if(data.items.length==0){
        subtotalContainer.style.display="none"
const html=`<div class="empty-content">
<h1>You haven't added anything to the cart yet</h1>
<a href="#" class="btn btn--bestsellers">Browse best sellers</a>
</div>`
productContainer.insertAdjacentHTML('afterbegin',html);

    }else{
        subtotalContainer.style.display="flex"
        data.items.forEach(element => {
            const html=`
            
                    <div class="cart-product">
                        <div class="cart-product__img">
                            <img src="${element.image}" alt="">
                        </div>
                        
                            <div class="cart-product__title">${ element.product_title }</div>
                            <div class="cart-product__variant">${element.variant_title?element.variant_title:""}</div>
                        <div class="cart-product__price">$${ element.final_line_price/100}.00</div>
                        <button data-key=${element.key} class="btn btn--remove">
                            &times;
                        </button>
                        <div data-key=${element.key} class="cart-product__qty">
                            <div data-quantity="-1" class="qty__minus"><svg width="8" height="1" viewBox="0 0 8 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H8V1H0V0Z" fill="currentColor"/>
                                </svg></div>
                            <div class="qty__number">
                                ${element.quantity}
                            </div>
                            <div data-quantity="1" class="qty__plus"><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.60125 0V3.44355H8V4.53226H4.60125V8H3.38205V4.53226H0V3.44355H3.38205V0H4.60125Z" fill="currentColor"/>
                                </svg></div>
                        </div>
            
                    </div>
                    
            
            `
            productContainer.insertAdjacentHTML("afterbegin",html)
        });
   
        const subtotal=document.querySelector(".title--subtotal")
        subtotal.innerHTML=""
        const subtotalContent=`
        <span>
        Subtotal
    </span>
<span>
    $${data.items.length==0?"":data.total_price/100}.00
</span>
        
        `
        subtotal.insertAdjacentHTML("afterbegin",subtotalContent)
    }
              


}
window.addEventListener("load",function(){
    const cartBtn=document.querySelector(".item--cart");
    cartBtn.addEventListener("click",function(){
        const cart=document.querySelector(".cart");
        cart.classList.add("cart-opened");
        
        fetch("/cart.js").then(res=>res.json()).then(data=>{
            console.log(data)
            cartRenderingFn(data)
        })
    });


});



// ----------- CART CLOSE BTN --------------//

window.addEventListener("click",function(e){
const btn=e.target.closest(".close-btn");

if(!btn) return 

const cart=document.querySelector(".cart");
cart.classList.remove("cart-opened");

});



// QUANTITY CHANGER
window.addEventListener("click",function(e){
    const btnRemove=e.target.closest(".btn--remove");
    const btnMinus=e.target.closest('.qty__minus');
        const btnPlus=e.target.closest('.qty__plus')
       const quantityChanger=(btn)=>{
        if(btn){
            const dataQuantity=btn.dataset.quantity*1
            const number=btn.parentElement.querySelector(".qty__number");
            number.textContent=number.textContent*1+dataQuantity;
            if(number.textContent*1<0){
                number.textContent=0
            }
            const productKey=btn.parentElement.dataset.key;
            const updatedData={
               id:productKey,
               quantity:number.textContent*1 
            }
            fetch('/cart/change.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
              }).then(res=>res.json()).then(data=>{
                cartRenderingFn(data);
              });
             
        }
    }
   quantityChanger(btnPlus);
   quantityChanger(btnMinus);
   console.log(btnRemove)
   if(btnRemove){
    
    fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:btnRemove.dataset.key,
            quantity:0
        }
          )
      }).then(res=>res.json()).then(data=>{
        cartRenderingFn(data);
      });
   }
})

//  ------------------ PRODUCT REMOVING --------
