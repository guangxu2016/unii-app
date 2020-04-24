<template>
	<view>
			<view v-if='userToken'>
			<view class="list" v-for="(item,index) in coms" :key="index">
				<view>
					<text>{{ i18n.dingdanhao }}：</text>
					<text>{{item.tradeNo}}</text>
				</view>
				<view>
					<text v-if="item.orderType == 1">{{ i18n.dingdantype }}：购买VIP</text>
					<text v-else-if="item.orderType == 2">{{ i18n.dingdantype }}：自动续费</text>
					<text v-else>{{ i18n.dingdantype }}：购买次数</text>
					<text @click="buyNum(item.tradeNo)" v-if="item.status == 0">{{ i18n.quzhifu }}</text>
					<text @click="buyNum(item.tradeNo)" v-else>{{ i18n.yizhifu }}</text>
				</view>
				<view>
					<text>{{item.createTime | formatDate}}</text>
					<text v-if="item.payType == 1">{{ i18n.shioyng }}<text>{{ i18n.weixin }}</text>{{ i18n.chongzhi }}<text>{{item.price}}</text>{{ i18n.yuan }}</text>
					<text v-else>{{ i18n.shioyng }} <text> {{ i18n.zhifgubao }}</text>{{ i18n.chongzhi }}<text>{{item.price}}</text>{{ i18n.yuan }}</text>
				</view>
			
			</view>
			<view class="loading">{{ loadingText }}</view>
			</view>
			<view class="go_login" v-else>
				<!-- <image src="../../static/image/msg.png" mode=""></image> -->
					<view>您还没有登陆，请登陆后再查看</view>
					<view @click="go_login">去登陆</view>
			</view>
			<!--  选择支付方式 -->
			<view class="header_top" v-show="payChoose">
				<view>{{ i18n.chooseZhiFu }}</view>
				<view>
					<radio @click="qiyeClick" value="" checked="true" v-if="alipy" />
					<radio @click="qiyeClick" value="" v-else />
					<text>{{ i18n.zhifubao }}</text>
				</view>
				<view>
					<radio @click="gerenClick" value="" checked="true" v-if="wxpay" />
					<radio @click="gerenClick" value="" v-else />
					<text>{{ i18n.weixin }}</text>
				</view>
				<view class="anniu">
					<text @click="sure">{{ i18n.clickSure }}</text>
					<text @click="cancel">{{ i18n.clickCancel }}</text>
				</view>
			</view>
			<view class="hide" v-show="hide"></view>
	</view>
</template>

<script>
	var _self,
		page = 1,
		timer = null;
export default {
	data() {
		return {
			baseUrl:"",
			coms:[],
			loadingText: '加载中...',
			payChoose:false,
			hide:false,
			alipy: true,
			wxpay: false,
			shopNum:"",
			userToken:false
		};
	},
	filters: {
	       formatDate: function (value) {
	        var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	        var Y = date.getFullYear() + '-';
	        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	        var D = date.getDate() + ' ';
	        var h = date.getHours() + ':';
	        var m = date.getMinutes() + ':';
	        var s = date.getSeconds();
	        return Y+M+D+h+m+s;
	      }
	    },
		computed: {
			i18n() {
				return this.$t('index');
			}
		},
	onLoad: function() {
		_self = this;
		console.log('1');
		this.getnewsList();
		let token = uni.getStorageSync('storage_token');
		if(token == "" || token == null || token == undefined){
			this.userToken = false
		}else {
			this.userToken = true;
		}
		
		uni.setNavigationBarTitle({
			title: this.$t('index.orders')
		})	
	},
	// 下拉
	onPullDownRefresh: function() {
		console.log('2');
		this.getnewsList();
	},
	// 上拉
	onReachBottom: function() {
		console.log('3');
		if (timer != null) {
			console.log('4');
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			_self.getmorenews();
		}, 1000);
	},
	methods: {
		go_login(){
			uni.navigateTo({
				url:"../login/login"
			})
		},
		// 上拉下拉时调用
		getmorenews: function() {
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			if (_self.loadingText != '' && _self.loadingText != '加载更多') {
				return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url: this.baseUrl + '/api/myorders?count=10&page=' + page,
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					_self.loadingText = '';
					if (res.data.data == null) {
						uni.hideNavigationBarLoading();
						_self.loadingText = '已加载全部';
						return false;
					}
					page++;
					console.log(res);
				_self.coms = _self.coms.concat(res.data.data);
					
					_self.loadingText = '加载更多';
					uni.hideNavigationBarLoading();
				}
			});
		},
		// 初始化时调用/
		getnewsList: function() {
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			page = 1;
			uni.showNavigationBarLoading();
			uni.request({
				url: this.baseUrl + '/api/myorders?count=10&page=' + page,
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					page++;
					_self.coms = res.data.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					_self.loadingText = '加载更多';
				}
			});
		},
		gerenClick() {
			this.wxpay = true;
			this.alipy = false;
		},
		qiyeClick() {
			this.wxpay = false;
			this.alipy = true;
		},
		buyNum(id) {
			this.payChoose = true;
			this.hide = true;
			this.shopNum = id;
			console.log(this.shopNum);
		},
		sure() {
			// this.flag = false;
			var alipy;
			if (this.alipy == true) {
				alipy = '2';
			} else {
				alipy = '1';
			}
			console.log(alipy);
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			// pay_type  1/微信 2/支付宝  3/小程序
			// type 1/VIP 2/超出后购买 3/自动续费 4/会员免费单词查询
			uni.request({
				url: this.baseUrl + '/api/payOrder',
				method: 'GET',
				data: {
					pay_type: alipy,
					order_no: this.shopNum
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					if (res.data.code == 200) {
						console.log(res.data);
						// console.log(res.data.data.payData);
						// orderInfo 微信/支付宝订单数据
						// provider:provider  wxpay/微信 alipay支付宝
		
						let orderInfo = res.data.data.payData;
						console.log(orderInfo);
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: orderInfo,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		cancel() {
			this.hide = false;
			this.payChoose = false;
		},
		// country() {
			// uni.navigateTo({
			// 	url: '../orderdetail/orderdetail'
			// });
		// },
		// onNavigationBarButtonTap() {
		// 	console.log('你点击了按钮');
		// },
	}
};
</script>

<style>
.list {
	position: relative;
	margin: 0rpx 30rpx;
	/* height: 110rpx; */
	padding-top: 15rpx;
	padding-bottom: 15rpx;
	/* height: 160rpx; */
	border-bottom: 1px solid #ccc;
	overflow: hidden;
	box-sizing: border-box;
}
.list view:first-child {
	font-size: 32rpx;
	color: #444;
}
.list view:first-child text:last-child {
	color: #666;
}
.list view:nth-child(2) {
	color: #444;
	height: 45rpx;
}
.list view:nth-child(2) text:last-child {
	color:#fff;
	background-color: #007AFF;
	float: right;
	width: 140rpx;
	text-align: center;
	height: 45rpx;
	line-height: 45rpx;
	margin-right: 20rpx;
	border-radius: 20rpx;
	margin-top: -6rpx;
}

.list view:nth-child(3),
.list view:nth-child(2) {
	font-size: 28rpx;
	margin-left: 6rpx;
	margin-top: 20rpx;
	width: 100%;
}
.list view:nth-child(3) > text:first-child {
	float: right;
	margin-right: 20rpx;
	color:#888;
}
.list view:nth-child(3) > text:nth-child(2) {
	color: #555;
}
.list view:nth-child(3) > text:last-child {
	/* margin-left: 20rpx; */
}

.list view:nth-child(3) > text:last-child text:last-child {
	color: #dd524d;
}
.list view:first-child image {
	width: 80rpx;
	height: 60rpx;
	vertical-align: middle;
}
.list image:nth-child(2) {
	position: absolute;
	top: 35rpx;
	right: 0rpx;
	width: 50rpx;
	height: 50rpx;
}

.loading {
	text-align: center;
	color:#999;
	font-size:28rpx;
	margin: 10px;
}



/*  选择支付方式 */
.header_top {
	position: fixed;
	top: 30%;
	left: 50%;
	width: 80%;
	margin-left: -40%;
	background-color: #fff;
	padding: 30rpx;
	border-radius: 20rpx;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf;
	z-index: 1000;
	overflow: hidden;
	box-sizing: border-box;
}
.header_top > view:nth-child(2),
.header_top > view:nth-child(3) {
	font-size: 34rpx;
	height: 66rpx;
	line-height: 66rpx;
}

.header_top view radio {
	transform: scale(0.7);
}

.header_top .anniu {
	overflow: hidden;
}

.header_top .anniu text {
	width: 40%;
	text-align: center;
	height: 70rpx;
	line-height: 70rpx;
	display: inline-block;
	background-color: #007aff;
	font-size: 32rpx;
	color: #fff;
	margin-top: 20rpx;
	border-radius: 20rpx;
}

.header_top .anniu text:first-child {
	float: left;
	margin-left: 5%;
}

.header_top .anniu text:last-child {
	float: right;
	margin-right: 5%;
}
.hide {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.5;
	z-index: 999;
}

.go_login {
	position: fixed;
	left: 50%;
	top:30%;
	width: 90%;
	margin-left: -45%;
}

.go_login image {
	width: 100%;
	height: 400rpx;
}

.go_login view:first-child {
	color:#888;
	font-size: 28rpx;
	text-align: center;
}

.go_login view:last-child {
	width: 240rpx;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 auto;
	margin-top: 30rpx;
	border-radius: 20rpx;
	color: #fff;
	background-color: #007AFF;
	font-size: 32rpx;
}


</style>
