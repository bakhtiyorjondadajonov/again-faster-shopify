window.addEventListener("load",function(){
    const variantForm=document.querySelector('.variant-form');
 variantForm.addEventListener("submit",function(e){
    e.preventDefault()
  
    const formData={
        items:[
            {
                id:document.querySelector('input[name="variant"]:checked').value,
                quantity:1
            }
        ]
    }
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

})
// --------- FRECUENTLY BOUGHT FUNCTUALITY -------
window.addEventListener("click",function(e){
  const btn=e.target.closest(".product-card_btn")
  if(!btn) return

  const variantId=btn.dataset.variantid;

  const formData={
    items:[
      {
        id:variantId,
        quantity:1
    }
    ]
  } 
console.log(formData)
fetch(window.Shopify.routes.root + 'cart/add.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => {
  return response.json();
})
.catch((error) => {
  console.error('Error:', error);
});
})