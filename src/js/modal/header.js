
define(['jquery'], ()=>{
    class Header{
        constructor(){
            this.header = $('header'),
            
            
            this.hdInit().then(()=>{
                // html加载完成后 操作header里面的dom
                this.searchIpt = $('#searchIpt');
                this.uplist = $('.uplist');
                this.form = $(".search-box");
                this.lis = $('.item');
                this.width = this.form.width();
                this.searchBox()
            })
        }
        hdInit(){
            return new Promise(resolve=>{
                this.header.load('./html/modal/header.html', ()=>{
                    resolve();//与上面的then对应
                })
            })
        }
        //header交互
        searchBox(){
            this.searchIpt.on('focus',()=>{
                
                this.uplist.show();
                this.form.stop().animate({width:'500px'},500);

                $('.item').hide().each(function(index){
                    $(this).delay(500*(index+1)).fadeIn().on('mouseenter', ()=>{
                    $(this).css({background:'#ada6a6'})
                }).on('mouseleave', ()=>{
                    $(this).css({background:''})
                })
                })
            }).on('blur', ()=>{
                this.form.animate({width:this.width},500);
                this.uplist.hide();
            })
        }
        
    }
    return new Header();
})