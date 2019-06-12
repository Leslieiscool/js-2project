require(['./config'], ()=>{
    require(['url', 'template','header', 'footer'], (url, template, header, footer)=>{
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
                console.log(id);
                console.log(listitem.items[id-1]);
                let html = template('buy-template', {
                    list: listitem.items[id-1]
                });
                $('#choose').html(html);
                this.init();
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

        }
        new Buy();
    })
})