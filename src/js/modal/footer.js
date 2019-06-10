define(['jquery'], ()=>{
    class Footer {
        constructor(){
            this.footer = $('footer'),
            this.ftInit().then(()=>{

            })
        }
        ftInit(){
            return new Promise(resolve=>{
                this.footer.load('/html/modal/footer.html', ()=>{
                    resolve();
                })
            })
        }
    }
    return new Footer();
})