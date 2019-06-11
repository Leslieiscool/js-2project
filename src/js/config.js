require.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/jquery-3.2.1.min',
        header: 'js/modal/header',
        footer: 'js/modal/footer',
        url: 'js/modal/url',
        template: 'libs/art-template/template-web',
        swiper: 'libs/swiper/js/swiper.min',
        cookie: 'libs/jquery-plugins/jquery.cookie',
    },
    // 垫片， 加载一些不满足AMD规范但是又依赖于别的模块
    // cookie插件不满足AMD并且依赖于jquery
    skim: {
        cookie: {
            deps: ['jquery']
        }
    }
})