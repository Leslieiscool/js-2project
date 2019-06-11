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
                if($('#username').val() && $('#password').val()){
                    let username = $('#username').val(),
                    password = $('#password').val();
                console.log(username)
                $.cookie('user', username, {path: '/', expire: '7'});
                $.cookie('psw', password, {path: '/', expire: '7'});
                window.location.href = '/index.html';
                }else{
                    alert('请输入用户名或密码')
                }
                
            }
        }
        new List();
    })
})