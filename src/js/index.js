require(['./config'], ()=>{
    require(['template', 'url','header','footer'], (template, url, header)=>{
        class Index{
            constructor(){
                
                this.hot();
            }
            
            hot(){
                //取得数据
                $.get(url.baseUrl+'/gd/list', resp=>{
                    console.log(resp);
                    if(resp.code===200){
                        this.renderHot(resp.gdlist)
                    }
                })
            }
            // 渲染前端
            renderHot(gdList){
                let html = template('items-template', {
                    list: gdList.goods
                });
                $('#list-box').html(html);
                this.hotShade();
            }
            //hot交互
            hotShade(){
                $('#list-box').on('mouseenter','#hot-items', function(){
                    console.log(1);
                    $(this).children('#hot-pic').show().css({transform:"scale(1.2)"});
                    console.log($(this).children('#hot-pic'));
                    $(this).children('#hot-shade').show();
                    $(this).children('#hot-btn').show();
                }).on('mouseleave','#hot-items', function(){
                    $(this).children('#hot-pic').css({transform:"scale(1)"})
                    $(this).children('#hot-shade').hide();
                    $(this).children('#hot-btn').hide();
                })
            }
        }
         new Index();
    })
})

