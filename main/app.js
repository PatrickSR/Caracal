var Vue = nodeRequire('Vue')
Vue.use(nodeRequire('vue-resource'))

var apikey = '8c298090c899e40d62f635ada08535a2'

//初始化快递单，从LocalStorage获取
var expressList = []
if (localStorage.expressList) {
    expressList = JSON.parse(localStorage.expressList)
}
/**
 * 测试单号
 * 
 * 3903790134334
 * 
 * 
 */

$(document).ready(function () {
    $('#div_float_button').leanModal();

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.tooltipped').attr('data-tooltip', '开发者：Patrick QQ:316463304');
})

var fabVM = new Vue({
    el: '#div_float_button'
    , methods: {
        addOrder: function (event) {
            // alert('Hello') 
        }
    }
})

//添加快递单的框
var addExpressVM = new Vue({
    el: '#add_express_form',
    data: {
        express_id: ''
    },
    methods: {
        add_express: function (event) {
            //添加快递单
            queryExpress(this, this.express_id);
        }
    }
})

/**
 * @param id 快递单号
 */
function queryExpress(vue, id) {
    var url = 'http://apis.baidu.com/kuaidicom/express_api/express_api?nu=' + id + '&muti=0&order=desc';

    // GET request
    vue.$http({ url: url, method: 'GET', headers: { apikey: apikey } }).then(function (response) {
        var express = response.data
        console.log(express)
        if (express.success) {
            expressList.push(express)
            updateLocalStorage()
            //添加快递单后，文本框清空
            vue.express_id = '';
        } else {
            var errorContent = errorCode['e'+express.errNum];
            Materialize.toast(errorContent, 3000, 'rounded')
        }
        //关闭框
        $('#add_express_form').closeModal();

    }, function (response) {
        console.log('error:' + response)

    });
}

/**
 * 更新本地缓存
 */
function updateLocalStorage() {
    localStorage.expressList = JSON.stringify(expressList)
}

/**
 * 从缓存获取快递列表
 */
function initExpressList() {
    if (localStorage.expressList) {
        expressList = JSON.parse(localStorage.expressList)
    }
}

var expressListVM = new Vue({
    el: '#express_list',
    data: {
        lists: expressList
    }
})

var errorCode = {
    e300101:'请求过期',
    e300102:'调用量超限',
    e300103:'服务每秒调用量超限',
    e300104:'服务日调用量超限',
    e300201:'url无法解析',
    e300202:'请求缺少apikey',
    e300203:'服务没有取到apikey或secretkey',
    e300204:'apikey不存在',
    e300205:'api不存在',
    e300206:'api已关闭服务',
    e300207:'余额不足，请充值',
    e300208:'未通过实名验证',
    e300209:'服务商响应status非200',
    e300301:'内部错误',
    e300302:'系统繁忙稍候再试',
    e300401:'apistore的快递网授权码无效',
    e300402:'缺少单号参数',
    e300403:'无法根据单号匹配到快递公司',
    e300404:'没有查到物流信息'
}