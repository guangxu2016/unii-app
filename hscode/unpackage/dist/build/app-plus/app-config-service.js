
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/cross/cross","pages/lock/lock","pages/my/my","pages/query/query","pages/jilujieguo/jilujieguo","pages/codeQuery/codeQuery","pages/chaxunjieguo/chaxunjieguo","pages/miaoshuchaxun/miaoshuchaxun","pages/zhuanyi/zhuanyi","pages/setting/setting","pages/order/order","pages/orderdetail/orderdetail","pages/shoucang/shoucang","pages/login/login","pages/register/register","pages/teggs/teggs","pages/renzheng/renzheng","pages/account/account","pages/moreNum/moreNum","pages/yitihua/yitihua","pages/yitihuadetail/yitihuadetail","pages/yonghuxieyi/yonghuxieyi","pages/yinsizhengce/yinsizhengce","pages/aboutUS/aboutUS","pages/weituidetail/weituidetail","pages/details/details","pages/forget/forget","pages/set/set"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#2198F2","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/image/sy1.png","selectedIconPath":"static/image/sy0.png","text":"首页"},{"pagePath":"pages/cross/cross","iconPath":"static/image/kj1.png","selectedIconPath":"static/image/kj0.png","text":"跨境关务"},{"pagePath":"pages/lock/lock","iconPath":"static/image/suo1.png","selectedIconPath":"static/image/suo0.png","text":"委托制单"},{"pagePath":"pages/my/my","iconPath":"static/image/gr1.png","selectedIconPath":"static/image/gr0.png","text":"个人中心"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"TEGGS","compilerVersion":"2.6.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/cross/cross","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"跨境关务","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/lock/lock","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"委托制单","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/query/query","meta":{},"window":{"navigationBarTitleText":"查询记录","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white","enablePullDownRefresh":true,"onReachBottomDistance":50}},{"path":"/pages/jilujieguo/jilujieguo","meta":{},"window":{"navigationBarTitleText":"查询记录","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/codeQuery/codeQuery","meta":{},"window":{"navigationBarTitleText":"查询","navigationBarBackgroundColor":"#2198F2","navigationBarTextStyle":"white"}},{"path":"/pages/chaxunjieguo/chaxunjieguo","meta":{},"window":{"navigationBarTitleText":"查询结果","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/miaoshuchaxun/miaoshuchaxun","meta":{},"window":{"navigationBarTitleText":"商品描述查询","navigationBarBackgroundColor":"#2198F2","navigationBarTextStyle":"white"}},{"path":"/pages/zhuanyi/zhuanyi","meta":{},"window":{"navigationBarTitleText":"转译查询","navigationBarBackgroundColor":"#2198F2","navigationBarTextStyle":"white"}},{"path":"/pages/setting/setting","meta":{},"window":{"navigationBarTitleText":"修改信息","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"订单信息","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white","enablePullDownRefresh":true,"onReachBottomDistance":50}},{"path":"/pages/orderdetail/orderdetail","meta":{},"window":{"navigationBarTitleText":"订单详情","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/shoucang/shoucang","meta":{},"window":{"navigationBarTitleText":"收藏","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white","enablePullDownRefresh":true,"onReachBottomDistance":50}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/teggs/teggs","meta":{},"window":{"navigationBarTitleText":"TEGGS","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/renzheng/renzheng","meta":{},"window":{"navigationBarTitleText":"认证","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/account/account","meta":{},"window":{"navigationBarTitleText":"账户","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/moreNum/moreNum","meta":{},"window":{"navigationBarTitleText":"续费","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/yitihua/yitihua","meta":{},"window":{"navigationBarTitleText":"一体化查询记录","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white","enablePullDownRefresh":true,"onReachBottomDistance":50}},{"path":"/pages/yitihuadetail/yitihuadetail","meta":{},"window":{"navigationBarTitleText":"查询记录详情","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/yonghuxieyi/yonghuxieyi","meta":{},"window":{"navigationBarTitleText":"用户协议","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/yinsizhengce/yinsizhengce","meta":{},"window":{"navigationBarTitleText":"隐私政策","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/aboutUS/aboutUS","meta":{},"window":{"navigationBarTitleText":"关于我们","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/weituidetail/weituidetail","meta":{},"window":{"navigationBarTitleText":"委托制单详情","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/details/details","meta":{},"window":{"navigationBarTitleText":"详情信息","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/forget/forget","meta":{},"window":{"navigationBarTitleText":"忘记密码","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"#1676fe","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
