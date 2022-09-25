
window.addEventListener('load', function() {
  const featuredCollectionCarousel=document.querySelector(".swiper--home-collection");
  const pdpHeaderCarousel=document.querySelector(".swiper--pdp");
if(featuredCollectionCarousel){
  const swiper = new Swiper(".swiper--home-collection", {
      slidesPerView: 4,
          scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
          },
        });

}
if(pdpHeaderCarousel){
  const swiperPdpHeader = new Swiper(".swiper--pdp", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });     

}
       })