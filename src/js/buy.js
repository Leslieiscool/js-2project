require(['./config'], ()=>{
    require(['url', 'template','header', 'footer', 'fly'], (url, template, header, footer)=>{
        class Buy {
            constructor(){
                
                this.choose();
            }
            
            //获取数据
            choose(){
                $.get(url.baseUrl+'/gd/list', resp=>{
                    console.log(resp);
                    if(resp.code===200){
                        this.pushIt(resp.listitem);
                    }
                })
            }
            //渲染前端
            pushIt(listitem){
                let id = (window.location.search.slice(1)).split('=')[1];
                // console.log(id);
                // console.log(listitem.items[id-1]);
            //取得对应商品的信息 存入storage 
                this.buyIfo = listitem.items[id-1];
                // console.log(this.buyIfo);
                
                let html = template('buy-template', {
                    list: listitem.items[id-1]
                });
                $('#choose').html(html);
                this.init();
                this.addcart();
            }

            init(){
                $('#etalage').etalage({
                    thumb_image_width: 400,
                    thumb_image_height: 400,
                    source_image_width: 1200,
                    source_image_height: 1200,
                    show_hint: true,
                    click_callback: function(image_anchor, instance_id){
                        alert('回调函数:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
                    }
                })
            }
            //加入购物车
            addcart(){
                //存数据到localstorage
                $('.buyit').on('click', ()=>{
                    
                    //取cart
                    let cartlist = localStorage.getItem('cart');
                    if(cartlist){
                        //有cart  转成json
                        cartlist = JSON.parse(cartlist);
                        // console.log(cartlist);
                        let i = -1;
                        //遍历cartlist 
                        let isexist = cartlist.some((buyifo,index)=>{
                            i=index;
                            //判断 是否有当前页面这条数据 返回布尔值
                            return buyifo.id === this.buyIfo.id;
                        });
                        if(isexist){
                            // console.log(cartlist[i].num);
                            //有这条数据 加数量
                            cartlist[i].num = cartlist[i].num+1 ;
                            this.buyIfo.num = this.buyIfo.num+1 ;
                            
                        }else{
                            //没有这条数据 存入这条数据
                            cartlist.push(this.buyIfo);
                        }
                        localStorage.setItem('cart', JSON.stringify(cartlist));
                    }else{
                        //没有cart 把数据存到 cart 存成字符串
                        this.buyIfo = {
                            ...this.buyIfo,
                            num : 1 
                        };
                        
                        $('#gdnum').html(this.buyIfo.num);
                        localStorage.setItem('cart', JSON.stringify([this.buyIfo]))
                    }

                    // console.log(i);
                    //fly
                    let _this = this;
                    // console.log(cartlistnum);
                    // 抛物线
                    $(`<img src="${this.buyIfo.gdpic[0].pic}" style="width:20px;height:30px">`)
                    .fly({
                        start: $(".buyit").offset(),
                        end: $("#gdnum").offset(),
                        // autoPlay: true, //是否直接运动,默认true
                        // speed: 1.1, //越大越快，默认1.2
                        // vertex_Rtop：100, //运动轨迹最高点top值，默认20
                        onEnd: function(){
                        // console.log(this)
                        this.destroy()
                        // let num = Number(this.buyIfo.num)
                        // num ++;
                        // console.log(this.buyIfo.num)
                        $("#gdnum").html(5)
                        
                        } //结束回调
                    })
                })
            }

            
            
        }
        new Buy();
    })
})