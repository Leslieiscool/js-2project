require(['./config'], ()=>{
    require(['swiper', 'header', 'footer'],(Swiper, header, footer)=>{
        class Detail {
            constructor(){
                this.swiperPt();
                this.pushId();
            }

            swiperPt(){
                let myswiper = new Swiper('.swiper-container', {
                    speed: 500,
                    autoplay: {
                        autoplay: 1000,
                        disableOnInteraction: false,
                      },
                    effect : 'slide',
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: 'true',
                      },
                      navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      },
                })
            }

            pushId(){
                let id = window.location.search;
                console.log(id);
                $('.tobuy').attr('href',`/html/buy.html${id}`);
            }

        }
        new Detail();
    })
})