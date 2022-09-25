window.addEventListener("load",function(){
    const cartBtn=document.querySelector(".item--cart");
const closeBtn=document.querySelector(".close-btn");
    cartBtn.addEventListener("click",function(){
        const cart=document.querySelector(".cart");
        cart.classList.add("cart-opened");
        fetch("/cart.js").then(res=>res.json()).then(data=>console.log(data))


 
    });


});
window.addEventListener("click",function(e){
const btn=e.target.closest(".close-btn");

if(!btn) return 

const cart=document.querySelector(".cart");
cart.classList.remove("cart-opened");

});