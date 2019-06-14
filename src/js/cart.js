require(['./config'], ()=>{
    require(['template', 'header', 'footer'], (template, header, footer)=>{
        class Cart{
            constructor(){
                this.n =0;
                this.getgd();
                this.iptcheck();
            }

            //从storage里取数据并渲染购物车
            getgd(){
                let goodifo = JSON.parse(localStorage.getItem('cart'));
                // console.log(goodifo);
                let html = template('cart-template', {
                    list : goodifo,
                });
                $('#gdlist').html(html);
                this.deletegd();
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
                });
                this.checks();
            }
            //单选按钮
            checks(){
                $('.check').each((index, item)=>{
                    $(item).on('change',()=>{
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
            //删除商品
            deletegd(){
                
                    $('.lidelete').each((index, item)=>{
                        console.log($('.delete'));
                    $(item).on('click', ()=>{
                        console.log(index);
                        let cartlist = JSON.parse(localStorage.getItem('cart'));
                        cartlist.splice(index, 1);
                        console.log(cartlist);
                        localStorage.setItem('cart', JSON.stringify(cartlist));
                        this.getgd();
                        header.cartnum();
                        })
                        
                    })
                
            }
                

        }
        new Cart();
    })
})