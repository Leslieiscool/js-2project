require(['./config'], ()=>{
    require(['template', 'header', 'footer'], (template, header, footer)=>{
        class Cart{
            constructor(){
                // this.n =0;
                this.bindEvent();
                // this.adorct();
            }

            bindEvent(){
                this.getgd();
                
            }
            //从storage里取数据并渲染购物车
            getgd(){
                let cartlist = JSON.parse(localStorage.getItem('cart'));
                // console.log(goodifo);
                let html = template('cart-template', {
                    list : cartlist,
                });
                $('#gdlist').html(html);
                this.n = $('.check').length;

                this.iptcheck(); 
                this.deletegd();
                this.adorct();
                this.tlcalc();
                this.sgcalc();
            }

            //点击按钮
            iptcheck(){
                $('.allck').on('change', ()=>{
                    // console.log($('.allck').is(':checked'));
                    // console.log(this.n);
                    $('.check').each((index, item)=>{
                        $(item).prop('checked',$('.allck').is(':checked'));
                    });
                    // console.log($('.check').length);
                    this.tlcalc();
                    this.n = $('.allck').is(':checked') ? $('.check').length : 0 ;
                    // console.log(this.n);
                });
                this.checks();
            }
            //单选按钮
            checks(){
                // console.log($('.check').length);
                $('.check').each((index, item)=>{
                    $(item).on('change',()=>{
                        this.n += $(item).is(':checked') ? 1 : -1;
                        // console.log(this.n);
                        // console.log($('.check').length);
                        if(this.n === $('.check').length){
                            // console.log(1);
                            $('.allck').prop('checked', true);
                        }else{
                            // console.log(2);
                            $('.allck').prop('checked', false);
                        }
                        this.tlcalc();
                    })
                })
            };
            //删除商品
            deletegd(){
                let _this = this;
                $('#gdlist').on('click', '.lidelete', function(){
                    if($(this).parents('.ergoods').find('.check').is(':checked')){
                        _this.n --;
                    }
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
                    console.log($('.check').length);
                    if(_this.n === $('.check').length){
                        // console.log(1);
                        $('.allck').prop('checked', true);
                    }else{
                        // console.log(2);
                        $('.allck').prop('checked', false);
                    }
                    _this.tlcalc();
                })
                
            }
            //增减数量
            adorct(){
                $('.eygoods').each((index, item)=>{
                    $(item).find('#cutnum').on('click',()=>{
                        let num = $(item).find('#itnum').html();
                        num --;
                        console.log(num);
                        if(num <= 1){
                            num = 1;
                        }else{
                            // $(item).find('.check').prop('checked', true);
                        }
                        $(item).find('#itnum').html(num);
                        // this.iptcheck();
                        this.sgcalc();
                        this.tlcalc();
                    });
                    $(item).find('#addnum').on('click',()=>{
                        let num = Number($(item).find('#itnum').html());
                        num ++;
                        console.log(num);
                        if(num > 5){
                            num = 5;
                            // $(item).find('.check').prop('checked', true);
                        }else{
                        }
                        $(item).find('#itnum').html(num);
                        this.sgcalc();
                        this.tlcalc();
                    });
                })
            }
            //总计计算
            tlcalc(){
                let money = 0;
                if($('.allck').is(':checked')){
                    $('.eygoods').each((index, item)=>{
                        if($(item).find('.check').is(':checked')){
                            console.log($(item).find('.check').is(':checked'));
                            money += Number($(item).find('.price').html())*Number($(item).find('#itnum').html());
                        }
                    })
                }else{
                    $('.eygoods').each((index, item)=>{
                    if($(item).find('.check').is(':checked')){
                        console.log($(item).find('.check').is(':checked'));
                        money += Number($(item).find('.price').html())*Number($(item).find('#itnum').html());
                    }
                    })
                }
                $('#total').text(money.toFixed(2));
            }

            //小记计算
            sgcalc(){
                $('.eygoods').each((index, item)=>{
                    let m = 0;
                    console.log($(item).find('.check').is(':checked'));
                    m = m+Number($(item).find('.price').html())*Number($(item).find('#itnum').html());
                    $(item).find('.sgtl').html(m);
                })
            }
            

        }
        new Cart();
    })
})