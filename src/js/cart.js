require(['./config'], ()=>{
    require(['template', 'header', 'footer'], (template, header, footer)=>{
        class Cart{
            constructor(){
                this.n =0;
                this.iptcheck();
                this.getgd();
            }

            //全选按钮
            iptcheck(){
                console.log(this.n);
                $('.allck').on('change', ()=>{
                    // console.log($('.allck').is(':checked'));
                    // console.log($('.check'));
                    // console.log(this.n);
                    $('.check').each((index, item)=>{
                        $(item).prop('checked',$('.allck').is(':checked'));
                    });
                    // console.log($('.check').length);
                    this.n = $('.allck').is(':checked') ? $('.check').length : 0 ;
                    console.log(this.n);
                    // this.checks($n);
                });
                this.checks();
            }
            //单选按钮
            checks(){
                // console.log(n);
                $('.check').each((index, item)=>{
                    $(item).on('change',()=>{
                        // console.log(n);
                        this.n += $(item).is(':checked') ? 1 : -1;
                        console.log(this.n);
                        // console.log($('.check').length);
                        if(this.n === $('.check').length){
                            // console.log(1);
                            $('.allck').prop('checked', true);
                        }else{
                            // console.log(2);
                            $('.allck').prop('checked', false);
                        }
                    })
                    
                });
            }
            //从storage里取数据并渲染购物车
            getgd(){
                console.log(1);
                let goodifo = JSON.parse(localStorage.getItem('cart'));
                console.log(goodifo);
                let html = template('cart-template', {
                    list : goodifo,
                });
                $('#gdlist').html(html);
            }


        }
        new Cart();
    })
})