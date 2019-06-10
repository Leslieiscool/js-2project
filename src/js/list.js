require(['./config'], ()=>{
    require(['template', 'url', 'header', 'footer'], (template, url, header,footer)=>{
        class List {
            constructor(){
                this.right();
            }
            
            //right 获取数据
            right(){
                $.get(url.baseUrl+'/gd/list', resp=>{
                    console.log(resp);
                    if(resp.code===200){
                        this.renderRight(resp.listitem)
                    }
                })
            }
            //right 渲染数据
            renderRight(listitem){
                let html = template('list-template', {
                    list: listitem.items
                });
                $('#right-box').html(html);
                this.itemShade();
            }
            //right 交互
            itemShade(){
                $('#right-box').on('mouseenter','#hot-items', function(){
                    $(this).children('#hot-pic').show().css({transform:"scale(1.2)"});
                    // console.log($(this).children('#hot-pic'));
                    $(this).children('#hot-shade').show();
                    $(this).children('#hot-btn').show();
                }).on('mouseleave','#hot-items', function(){
                    $(this).children('#hot-pic').css({transform:"scale(1)"})
                    $(this).children('#hot-shade').hide();
                    $(this).children('#hot-btn').hide();
                })
            }
        }
        new List();
    })
})