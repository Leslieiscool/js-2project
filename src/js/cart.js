require(['./config'], ()=>{
    require(['template', 'header', 'footer'], (template, header, footer)=>{
        class Cart{
            constructor(){
                this.n =0;
                this.getgd();
                
            }

            //从storage里取数据并渲染购物车
            getgd(){
                let cartlist = JSON.parse(localStorage.getItem('cart'));
                // console.log(goodifo);
                let html = template('cart-template', {
                    list : goodifo,
                });
                $('#gdlist').html(html);
                this.deletegd();
                this.iptcheck();
            }

            //全选按钮
            iptcheck(){
                $('.allck').on('change', ()=>{
                    // console.log($('.allck').is(':checked'));
                    // console.log($('.check'));
                    // console.log(this.n);
                    $('.check').each((index, item)=>{
                        $(item).prop('checked',$('.allck').is(':checked'));
                    });
                    // console.log($('.check').length);
                    this.n = $('.allck').is(':checked') ? $('.check').length : 0 ;
                    // this.checks($n);
                    console.log(1);
                    console.log(this.n);
                });
                this.checks();
            }
            //单选按钮
            checks(){
                console.log($('.check').length);
                
                $('.check').each((index, item)=>{
                    
                    $(item).on('change',()=>{
                        this.n += $(item).is(':checked') ? 1 : -1;
                        console.log(2);
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
                })
            };
            //删除商品
            deletegd(){
                let _this = this;
                $('#gdlist').on('click', '.lidelete', function(){
                    let cartlist = JSON.parse(localStorage.getItem('cart'));
                    // console.log($(this).attr('id'));
                    cartlist.forEach((item, index)=>{
                        if(item.id == $(this).attr('id')){
                            cartlist.splice(index, 1);
                            localStorage.setItem('cart', JSON.stringify(cartlist));
                            header.cartnum();
                            $(this).parents('.eygoods').remove();
                        }
                    })
                    if($(this).parents('.ergoods').find('.check').is(':checked')){
                        _this.n --;
                    }
                    if(_this.n === $('.check').length){
                        // console.log(1);
                        $('.allck').prop('checked', true);
                    }else{
                        // console.log(2);
                        $('.allck').prop('checked', false);
                    }
                })
            }
            
            //总计计算


        }
        new Cart();
    })
})