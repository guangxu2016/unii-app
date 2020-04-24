<template>
	<view class="box">
		<view class="peo_header">
			<image :src="userImg"></image>
			<view class="header_yong_hu">
				<view>
					{{ userName }}
					<text class="vip"></text>
				</view>
				<view>
					{{ i18n.shengyu }}
					<text>{{ days }}</text>
					{{ i18n.day }}
				</view>
			</view>
		</view>
		<view class="huiyuan">
			<view>{{ yizhi }}</view>
			<view>
				<view @click="payTypeId(item.id, index,item.price)" :class="{ checked: isCheck == index }" v-for="(item, index) in list.vip_list" :key="item.id">
					<view>
						<text>{{ item.month }}月</text>
						<text>{{ item.price }}元</text>
						<view class="dui">
							<image src="../../static/image/dui.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="huiyuan">
			<view>{{ miaoshu }}</view>
			<view>
				<view @click="payTypeIdtwo(item.id, index,item.price)" :class="{ checkedtwo: isCheckTwo == index }" v-for="(item, index) in lists.vip_list" :key="item.id">
					<view>
						<text>{{ item.month }}月</text>
						<text>{{ item.price }}元</text>
						<view class="dui">
							<image src="../../static/image/dui.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="huiyuan">
			<view>{{ zhuanyi }}</view>
			<view>
				<view @click="payTypeIdthree(item.id, index,item.price)" :class="{ checkedthree: isCheckthree == index }" v-for="(item, index) in zhuanyiss.vip_list" :key="item.id">
					<view>
						<text>{{ item.month }}月</text>
						<text>{{ item.price }}元</text>
						<view class="dui">
							<image src="../../static/image/dui.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="header_top zhifu">
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
		</view>
		<view class="header_top position" v-show="flag">
			
			<view class="anniu">
				<text>合计<text>￥{{prices}}</text></text>
				<text @click="sure">{{ i18n.clickSure }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			lists: [],
			zhuanyiss: [],
			alipy: true,
			wxpay: false,
			flag: true,
			baseUrl: '',
			vip_id: '',
			yizhi: '已知HSCODE',
			miaoshu: '商品描述',
			zhuanyi: '转译查询',
			isCheck: -1,
			isCheckTwo: -1,
			isCheckthree:-1,
			payid:"",
			prices:"0",
			userName:"",
			days:"",
			userImg:"",
			dui:false
		};
	},
	onShow() {
		this.listVip(1);
		this.listVips(2);
		this.zhuanyis(3);
		this.userinfo();
		uni.setNavigationBarTitle({
				title: this.$t('index.renzheng')
		})	
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		payTypeId(id, index,price) {
			console.log(id);
			this.isCheckTwo = -1;
			this.isCheckthree = -1;
			this.isCheck = index;
			this.payid = "";
			this.payid = id;
			// this.prices = "";
			this.prices = price;
			
		},
		payTypeIdtwo(id, index,price) {
			this.isCheck = -1;
			this.isCheckthree = -1;
			this.isCheckTwo = index;
			console.log(id);
			this.payid = "";
			this.payid = id;
			this.prices = price;
		},
		payTypeIdthree(id, index,price) {
			this.isCheck = -1;
			this.isCheckTwo = -1;
			this.isCheckthree = index;
			console.log(id);
			this.payid = "";
			this.payid = id;
			this.prices = price;
		},
		userinfo() {
			var that = this;
			that.baseUrl = that.websiteUrl;
			let token = uni.getStorageSync('storage_token');
		
			uni.request({
				url: that.baseUrl + '/api/userInfo',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					if (res.data.code == 200) {
						console.log(res.data);
						// console.log(res.data.data.account);
						// console.log(res.data.data.vip_balance_days);
						// console.log(res.data.data.portrait);
						that.userName = res.data.data.account;
						that.days = res.data.data.vip_balance_days || 0;
						that.userImg = res.data.data.portrait;
					}
				}
			});
		},
		listVip(type) {
			this.baseUrl = this.websiteUrl;
			console.log(this.baseUrl);
			let token = uni.getStorageSync('storage_token');
			console.log(token);
			uni.request({
				url: this.baseUrl + '/api/getVipList',
				method: 'GET',
				data: {
					type: type
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					if (res.data.code == 200) {
						this.list = res.data.data;

						console.log(this.list);
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		listVips(type) {
			this.baseUrl = this.websiteUrl;
			console.log(this.baseUrl);
			let token = uni.getStorageSync('storage_token');
			console.log(token);
			uni.request({
				url: this.baseUrl + '/api/getVipList',
				method: 'GET',
				data: {
					type: type
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					if (res.data.code == 200) {
						this.lists = res.data.data;

						console.log(this.lists);
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		zhuanyis(type) {
			this.baseUrl = this.websiteUrl;
			console.log(this.baseUrl);
			let token = uni.getStorageSync('storage_token');
			console.log(token);
			uni.request({
				url: this.baseUrl + '/api/getVipList',
				method: 'GET',
				data: {
					type: type
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					if (res.data.code == 200) {
						this.zhuanyiss = res.data.data;

						console.log(this.zhuanyiss);
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		gerenClick() {
			console.log(this.wxpay);
			this.wxpay = true;
			this.alipy = false;
		},
		qiyeClick() {
			console.log(this.alipy);
			this.wxpay = false;
			this.alipy = true;
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
			console.log(this.payid);
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			// pay_type  1/微信 2/支付宝  3/小程序
			// type 1/VIP 2/超出后购买 3/自动续费 4/会员免费单词查询
			uni.request({
				url: this.baseUrl + '/api/vipOrder',
				method: 'POST',
				data: {
					pay_type: alipy,
					type: '1',
					vip_id: this.payid
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
						var paysss;
						console.log(orderInfo);
						if(alipy == 1){
							paysss = "wxpay";
							uni.requestPayment({
								provider: paysss,
								orderInfo: JSON.stringify(orderInfo),
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}else if(alipy == 2){
							paysss = "alipay";
							uni.requestPayment({
								provider: paysss,
								orderInfo: orderInfo,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
						console.log(paysss);
						// uni.requestPayment({
						// 	provider: paysss,
						// 	orderInfo: JSON.stringify(orderInfo),
						// 	success: function(res) {
						// 		console.log('success:' + JSON.stringify(res));
						// 	},
						// 	fail: function(err) {
						// 		console.log('fail:' + JSON.stringify(err));
						// 	}
						// });
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		// 支付
		xuFei(e, type) {
			this.flag = true;
			this.vip_id = e;
			console.log('当前id是' + this.vip_id);
			console.log('当前类型是' + type);
		}
	}
};
</script>

<style>
.box {
	/* padding-top: 30rpx; */
	padding-bottom: 50rpx;
}
.peo_header {
	position: relative;
	/* background-color: #007aff; */
	background-image: url('../../static/image/bg.png');
	background-size: 100% 100%;
	padding: 40rpx;
	height: 200rpx;
	margin-bottom: 30rpx;
	/* width: 500rpx; */
	overflow: hidden;
	box-sizing: border-box;
}
.peo_header image {
	width: 110rpx;
	height: 110rpx;
	border-radius: 50%;
	float: left;
	vertical-align: middle;
}
.peo_header .header_yong_hu {
	float: left;
	color: #fff;
	font-size: 32rpx;
	margin-left: 20rpx;
	margin-top: 10rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.peo_header .header_yong_hu view:nth-child(2) {
	font-weight: 700;
}
.peo_header .setting {
	position: absolute;
	right: 40rpx;
	top: 65rpx;
	width: 50rpx;
	height: 50rpx;
}
.detail {
	width: 94%;
	margin: 0 auto;
	background-color: #1676fe;
	padding: 30rpx;
	border-radius: 20rpx;
	/* -moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf; */
	overflow: hidden;
	box-sizing: border-box;
}
.detail + .detail {
	margin-top: 40rpx;
}
.detail text {
	font-size: 30rpx;
	color: #fff;
}

.listr {
	text-align: center;
	/* background-color: #1676fe; */
	border-top: 1px solid #5c9ffe;
	margin-top: 20rpx;
	padding-top: 20rpx;
	overflow: hidden;
}

.listr view {
	float: left;
	width: 25%;
}
.listr view text:first-child {
	font-size: 38rpx;
}
.listr view text {
	display: block;
}

.detail .vip text {
	font-size: 34rpx;
}
.detail .vip text:last-child {
	float: right;
	width: 150rpx;
	height: 55rpx;
	line-height: 55rpx;
	background-color: #fff;
	color: #1676fe;
	display: inline-block;
	text-align: center;
	margin-top: -8rpx;
	border-radius: 50rpx;
}

.position {
	position: fixed;
	 bottom: 0%; 
	/* left: 50%; */
	 width: 100%; 
	/* margin-left: -40%; */
	 background-color: #fff; 
	 border-top:1px solid #efefef;
	 height: 130rpx;
	
	/* padding: 30rpx; */
	/* border-radius: 20rpx;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf; */
	z-index: 1;
	overflow: hidden;
	box-sizing: border-box;
}
.header_top view:first-child {
	font-weight: 700;
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

.header_top .anniu > text {
	width: 40%;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	display: inline-block;
	background-color: #007aff;
	font-size: 32rpx;
	color: #fff;
	margin-top: 20rpx;
	border-radius: 40rpx;
}

.position .anniu > text {
	background-color: transparent;
}

.header_top .anniu > text:first-child {
	float: left;
	/* margin-left: 5%; */
	color:#666;
	text-align: left;
	padding-left: 5%;
}

.header_top .anniu > text:first-child text {
	color:#ff6d25;
	font-size: 40rpx;
}

.header_top .anniu > text:last-child {
	float: right;
	margin-right: 5%;
	background-color: #007AFF;
	font-size: 36rpx;
}

.zhifu {
	margin-top: 40rpx;
	margin-left: 5%;
	margin-bottom: 120rpx;
}

.zhifu view:first-child {
	font-size: 36rpx;
}

.hide {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.5;
}
.huiyuan {
	width: 90%;
	margin: 0 auto;
	padding-bottom: 40rpx;
	margin-top: 0rpx;
	overflow: hidden;
}
.huiyuan view:nth-child(2) {
	width: 100%;
}
.huiyuan > view:nth-child(2) > view {
	position: relative;
	padding: 10rpx 0rpx;
	padding-top: 15rpx;
	margin-top: 20rpx;
	width: 23%;
	/* line-height: 50rpx; */
	height: 140rpx;
	text-align: center;
	background-color: #f5f7fa;
	border-radius: 10rpx;
	float: left;
	overflow: hidden;
	box-sizing: border-box;
}
.huiyuan > view:nth-child(2) > view + view {
	margin-left: 2.5%;
}
.huiyuan view:nth-child(2) text:first-child {
	font-size: 28rpx;
	padding-top: 20rpx;
	color: #666;
}

.huiyuan view:nth-child(2) text:nth-child(2) {
	display: block;
	font-size: 38rpx;
	margin-top: 8rpx;
}
.checked > view >view.dui {
	position: absolute;
	bottom: 0;
	right: -40rpx;
	width: 90rpx;
	height: 30rpx;
	background-color: #ff6d25;
	transform: rotate(-36deg);
}

.checked > view >view image {
	position: absolute;
	bottom: 10rpx;
	right: 44rpx;
	width: 28rpx;
	height: 20rpx;
	transform: rotate(25deg);
}
	

.checked {
	/* color: #fff; */
	background: #fff5ef !important;
	border:1px solid #ff6e26;
}


.checkedtwo {
	/* color: #fff; */
	background: #fff5ef !important;
	border:1px solid #ff6e26;
}

.checkedtwo > view >view {
	position: absolute;
	bottom: 0;
	right: -40rpx;
	width: 90rpx;
	height: 30rpx;
	background-color: #ff6d25;
	transform: rotate(-36deg);
}

.checkedtwo > view >view image {
	position: absolute;
	bottom: 10rpx;
	right: 44rpx;
	width: 28rpx;
	height: 20rpx;
	transform: rotate(25deg);
}
.checkedthree {
	/* color: #fff; */
	background: #fff5ef !important;
	border:1px solid #ff6e26;
}

.checkedthree > view >view.dui {
	position: absolute;
	bottom: 0;
	right: -40rpx;
	width: 90rpx;
	height: 30rpx;
	background-color: #ff6d25;
	transform: rotate(-36deg);
}

.checkedthree > view >view image {
	position: absolute;
	bottom: 10rpx;
	right: 44rpx;
	width: 28rpx;
	height: 20rpx;
	transform: rotate(25deg);
}
.yizhi > view:first-child,
.miaoshu > view:first-child,
.zhuanyi > view:first-child {
	padding-left: 5%;
	margin-top: 40rpx;
	margin-bottom: 10rpx;
}

.line {
	width: 100%;
	height: 20rpx;
	background-color: #efefef;
}
</style>
