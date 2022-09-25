window.addEventListener("load",function(){
    const variantForm=document.querySelector('.variant-form');
 variantForm.addEventListener("submit",function(e){
    e.preventDefault()
  
    const formData={
        items:[
            {
                id:document.querySelector(".variant").getAttribute("data-variantId"),
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