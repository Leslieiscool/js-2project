require(['./config'], ()=>{
    require(['cookie', 'header', 'footer'], (cookie, header, footer)=>{
        class List {
            constructor(){
                this.onLog();
                
            }
            
            //点击登录事件
            onLog(){
                $('#logbtn').on('click', ()=>{
                    this.saveCk();
                })
            }
            // 把用户名和密码 存到cookie
            saveCk(){
                let username = $('#username').val();
                let password = $('#password').val()
                console.log(username)
            }
        }
        new List();
    })
})