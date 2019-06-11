
define(['jquery', 'cookie'], ()=>{
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
                this.searchBox();
                this.navBar();
                this.cancel();
                this.inputName();
                
            })
        }
        hdInit(){
            return new Promise(resolve=>{
                this.header.load('/html/modal/header.html', ()=>{
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
        // navbar 下拉框
        navBar(){
            $('.navbar').on('mouseenter', function(){
                // console.log($(this));
                $(this).children('.item-list').show();
            }).on('mouseleave', function(){
                $(this).children('.item-list').hide();
            });
        }
        //header-top 取消按钮
        cancel(){
            $('.icon-delete').on('click', function(){
                $('.header-top').hide()
            })
        }
        //渲染用户名
        inputName(){
             if($.cookie('user')){
                 $('.logT').html($.cookie('user')).click((e)=>{
                    e.preventDefault();
                });
                $('.regT').hide();
                this.userList();
             }else{
                $('.logT').html('登录')
             }

        }
        //user下拉
        userList(){
            $('.log-reg').click(()=>{
                $('.userList').show();
                this.out();
            })
            
        }
        //退出
        out(){
            $('.out').click(()=>{
                $('.regT').hide();
                $.removeCookie('user',{ path: '/'});
            })
        }
        
    }
    return new Header();
})