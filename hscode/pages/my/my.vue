<template>
	<view>
		<view class="peo_header">
			<!-- <image @click="photo" :src="userImg"></image> -->
			<view class="tou_xiang">
				<view class="touxiangicon" @click="upload"><image class="huiyuan_img" :src="image" mode=""></image></view>
			</view> 
			<view class="header_yong_hu" v-if="statu">
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
			<view class="header_yong_hu asdd" v-else>
				<view @click="login">{{ i18n.goLogin }}</view>
			</view>
			<image @click="set" class="setting" src="../../static/image/sz.png"></image>
			<view class="ren_zheng">
				<text @click="renzheng">{{ i18n.certification }}</text>
				<!-- <view>
					<text @click="renzheng">{{ i18n.view }}</text>
					<text @click="buyNum">{{ i18n.buyNum }}</text> 
				</view> -->
				<image @click="renzheng" src="../../static/image/jts.png" mode=""></image>
			</view>
		</view>
		<!-- <view class="ren_zheng" @click="renzheng">
			<text>我的认证</text>
			<image src="../../static/image/jt.png" mode=""></image>
		</view> -->
		<view class="zhang_hu">
			<view class="zhang_hu_title"><view></view>{{ i18n.account }}</view>
			<view @click="account">
				<image src="../../static/image/zh.png"></image>
				<view>
					{{ i18n.account_day }}
					<!-- 账户
					<text>126</text>天 -->
				</view>
			</view>
			<view @click="order">
				<image src="../../static/image/dd.png"></image>
				<view>{{ i18n.order }}</view>
			</view>
		</view>
		<view class="zhang_hu">
			<view class="zhang_hu_title"><view></view>{{ i18n.record }}</view>
			<view @click="query">
				<image src="../../static/image/cx.png"></image>
				<view>{{ i18n.queryRecord }}</view>
			</view>
			<view @click="shouCang">
				<image src="../../static/image/sc.png"></image>
				<view>{{ i18n.collection }}</view>
			</view>
			<view @click="yitihua" class="kua_jing">
				<image src="../../static/image/dd.png"></image>
				<view>{{ i18n.kujing }}</view>
			</view>
		</view>

	<!-- 	<view class="zhang_hu">
			<view class="zhang_hu_title">{{ i18n.agreement }}</view>
			<view @click="xieyi">
				<image src="../../static/image/xy.png"></image>
				<view>{{ i18n.userAgreement }}</view>
			</view>
			<view @click="zhengce">
				<image src="../../static/image/ys.png"></image>
				<view>{{ i18n.privacyPolicy }}</view>
			</view>
			<view @click="us">
				<image src="../../static/image/us.png"></image>
				<view>{{ i18n.about }}</view>
			</view>
		</view>
		<view class="zhang_hu changeuser">
			<view class="zhang_hu_title">{{ i18n.switchingUsers }}</view>
			<view @click="out">
				<image src="../../static/image/qh.png"></image>
				<view>{{ i18n.switchingUsers }}</view>
			</view>
		</view> -->
		<!-- <view class="zhang_hu">
			<view class="zhang_hu_title">一体化</view>
			<view>
				<image src="../../static/image/xml.png"></image>
				<view>XML</view>
			</view>
			<view>
				<image src="../../static/image/yth.png"></image>
				<view>一体化</view>
			</view>
			<view @click="out">
				<image src="../../static/image/out.png"></image>
				<view>退出登录</view>
			</view>
		</view> -->
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
		<view class="markx" v-show="mark">
			<view>{{ cookile }}</view>
			<view>
				<text @click="quxiao">取消</text>
				<text @click="queren">确认</text>
			</view>
		</view>
		<view class="mardd" v-show="markas"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			baseUrl: '',
			statu: false,
			payChoose: false,
			hide: false,
			alipy: true,
			wxpay: false,
			userName: '',
			days: '',
			userImg: '',
			mark: false,
			markas: false,
			cookile: '',
			iconcheck: 0, //头像是否改变
			image: '' //默认头像
		};
	},
	onShow() {
		
		uni.setNavigationBarTitle({
				title: this.$t('index.navTitleFour')
			})	
	uni.setTabBarItem({
		index:0,
	    text: this.i18n.navTitle
	});
	uni.setTabBarItem({
		index:1,
	    text: this.i18n.navTitleTwo
	});
	uni.setTabBarItem({
		index:2,
	    text: this.i18n.navTitleThree
	});
	uni.setTabBarItem({
		index:3,
	    text: this.i18n.navTitleFour
	});
		// console.log('now:' + this.websiteUrl);
		this.baseUrl = this.websiteUrl;
		var num = uni.getStorageSync('num');
		let token = uni.getStorageSync('storage_token');
		//  判断是否登录
		if (token == '' || token == null || token == undefined) {
			token = this.statu = false;
			this.mark = false;
		} else {
			token = this.statu = true;
			if (num == 1) {
				this.mark = true;
				this.markas = true;
			} else {
				this.mark = false;
				this.markas = false;
			}
		}
		console.log(num);

		// 用户信息
		this.userinfo();
		this.cookie();
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		cookie() {
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			console.log(this.baseUrl);
			console.log(token);
			uni.request({
				url: this.baseUrl + '/api/config',
				method: 'get',
				data: {
					type: 'cookie_alert'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					console.log(res.data.data);
					let remarkStr = '';
					// this.cookile = res.data.data;
					const system_info = uni.getStorageSync('system_info');
					console.log(system_info.language);
					if(system_info.language == "zh_CN"){
						remarkStr = res.data.data.cn.replace('\g','')
						this.cookile = remarkStr;
					}else {
						remarkStr = res.data.data.en.replace('\g','')
						this.cookile = remarkStr;
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		queren() {
			uni.setStorage({
				key: 'num',
				data: '2',
				success: function() {
					console.log('success');
				}
			});
			this.mark = false;
			this.markas = false;
		},
		quxiao() {
			uni.setStorage({
				key: 'num',
				data: '2',
				success: function() {
					console.log('success');
				}
			});
			this.mark = false;
			this.markas = false;
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
						that.image = res.data.data.portrait;
					}
				}
			});
		},
		upload() {
			let _self = this;
		
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					_self.image = tempFilePaths[0];
					// console.log('tempFilePaths[0]', tempFilePaths[0]); //能够打印出选中的图片
					console.log(_self.image);
					_self.iconcheck = 1; //点击后图片更改状态由0变成1
					_self.touxiang(_self.image);	
				},
				error: function(e) {
					console.log(e);
				}
			});
		},
		touxiang(path) {
			let token = uni.getStorageSync('storage_token');
			console.log(token);
			uni.uploadFile({
				url: this.baseUrl + '/api/uploadFile',
				method: 'POST',
				formData: {
					file: path
				},
				filePath: path,
				name: 'file',
				header: {
					token: token
				},
				success: res => {
					console.log(res.data);
					console.log(JSON.parse(res.data).code);
					let img = JSON.parse(res.data).data.img_path;
					// let img = res.data.data.img_path;
					console.log(img);
					uni.showToast({
						title: JSON.parse(res.data).msg,
						icon: 'none',
						duration: 800
					});
					console.log("22222222222");
					console.log(img);
					this.shangChuanImg(img);
					
				},
				fail: () => {},
				complete: () => {}
			});
		},
		shangChuanImg(img) {
			var that = this;
			let token = uni.getStorageSync('storage_token');
			// console.log(path);
			uni.request({
				url: this.baseUrl + '/api/portrait',
				method: 'POST',
				data: {
					path: img
				},
			
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					console.log(res.data);
					if (res.data.code == '200') {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
						that.userinfo();
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
						return false;
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		renzheng() {
			uni.navigateTo({
				url: '../renzheng/renzheng'
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
		buyNum() {
			this.payChoose = true;
			this.hide = true;
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
				url: this.baseUrl + '/api/vipOrder',
				method: 'POST',
				data: {
					pay_type: alipy,
					type: '3'
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
		account() {
			uni.navigateTo({
				url: '../account/account'
			});
		},
		query() {
			uni.navigateTo({
				url: '../query/query'
			});
		},
		set() {
			uni.navigateTo({
				url: '../set/set'
			});
		},
		yitihua() {
			uni.navigateTo({
				url: '../yitihua/yitihua'
			});
		},
		order() {
			uni.navigateTo({
				url: '../order/order'
			});
		},
		shouCang() {
			uni.navigateTo({
				url: '../shoucang/shoucang'
			});
		},
		login() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		// out() {
		// 	// 删除token
		// 	uni.removeStorageSync('storage_token');
		// 	// console.log(uni.getStorageSync('storage_token'));
		// 	uni.showToast({
		// 		title: '操作成功',
		// 		icon: 'none',
		// 		duration: 800
		// 	});
		// 	uni.navigateTo({
		// 		url: '../login/login'
		// 	});
		// },
		// xieyi() {
		// 	uni.navigateTo({
		// 		url: '../yonghuxieyi/yonghuxieyi'
		// 	});
		// },
		// zhengce() {
		// 	uni.navigateTo({
		// 		url: '../yinsizhengce/yinsizhengce'
		// 	});
		// },
		// us() {
		// 	uni.navigateTo({
		// 		url: '../aboutUS/aboutUS'
		// 	});
		// }
	}
};
</script>

<style>
.peo_header {
	position: relative;
	/* background-color: #007aff; */
	background-image: url('../../static/image/bg.png');
	background-size: 100% 100%;
	padding: 40rpx;
	height: 330rpx;
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
	margin-top: 15rpx;
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

.ren_zheng {
	margin-top: 160rpx;
	height: 150rpx;
	padding-top: 30rpx;
	/* line-height: 180rpx; */
	width: 100%;
	/* border-bottom: 1px solid #ccc; */
	background-image: url('../../static/image/rz.png');
	background-size: 100% 100%;
	overflow: hidden;
	box-sizing: border-box;
}
.ren_zheng text:first-child {
	float: left;
	color: #e2ddaa;
	font-size: 36rpx;
	font-weight: 700;
	margin-left: 30rpx;
	margin-top: 10rpx;
	width: 80%;
}
.ren_zheng view {
	float: right;
	margin-right: 20rpx;
}
.ren_zheng view text:nth-child(1) {
	float: left;
	color: #e2ddaa;
	font-size: 30rpx;
	/* width: 150rpx; */
	padding: 0rpx 20rpx;
	text-align: center;
	height: 50rpx;
	line-height: 50rpx;
	/* margin-top: 30rpx; */
	border-radius: 30rpx;
	font-weight: 400;
	border: 1px solid #e2ddaa;
}
.ren_zheng view text:nth-child(2) {
	float: left;
	color: #e2ddaa;
	font-size: 30rpx;
	/* width: 150rpx; */
	padding: 0rpx 20rpx;
	text-align: center;
	height: 50rpx;
	line-height: 50rpx;
	margin-top: 30rpx;
	margin-left: 40rpx;
	border-radius: 30rpx;
	font-weight: 600;
	border: 1px solid #e2ddaa;
}
.ren_zheng image {
	float: right;
	margin-top: 20rpx;
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}
.zhang_hu {
	margin: 0rpx 30rpx;
	margin-top: 30rpx;
	padding-bottom: 30rpx;
	border-bottom: 1px solid #eee;
	overflow: hidden;
	box-sizing: border-box;
}
.changeuser {
	margin-bottom: 20rpx;
	border-bottom: 0px;
}
.zhang_hu .zhang_hu_title {
	color: #111111;
	font-size: 32rpx;
	margin-bottom: 20rpx;
}
.zhang_hu_title view {
	float: left;
	width: 6rpx;
	height: 30rpx;
	background-color: #007AFF;
	border-radius: 10rpx;
	margin-top: 10rpx;
	margin-right: 5rpx;
}

.zhang_hu view + view {
	float: left;
	width: 25%;
	text-align: center;
	font-size: 28rpx;
	color: #656565;
}
/* .zhang_hu view:nth-child(2) image,
.zhang_hu view:nth-child(3) image {
	width: 55rpx;
	height: 55rpx;
} */
.zhang_hu > view + view image {
	width: 55rpx;
	height: 55rpx;
}
.vip {
	/* border: 1px solid #eab64a; */
	/* border-radius: 50%; */
	/* font-size: 24rpx; */
	width: 80rpx;
	height: 30rpx;
	/* text-align: center; */
	line-height: 30rpx;
	background-image: url(../../static/image/VIP.png);
	background-size: 100% 100%;
	display: inline-block;
	margin-left: 10rpx;
	vertical-align: middle;
}
.out {
	padding-bottom: 0rpx;
	overflow: hidden;
}
.out image {
	width: 40rpx;
	height: 40rpx;
	margin-left: 10rpx;
	float: left;
	vertical-align: middle;
}

.out view {
	float: left;
	margin-left: 10rpx;
}
.asdd {
	padding-top: 20rpx;
}

.kua_jing {
	width: 40% !important;
}

/* 选择支付方式 */
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
.zhang_hu_title {
	position: relative;
	/* padding-left: 10rpx; */
}
.zhang_hu_title:after {
	position: absolute;
	display: inline-block;
	left: 0rpx;
	top: 10rpx;
	content: '';
	height: 30rpx;
	width: 6rpx;
	border-radius: 10rpx;
	/* margin-right: 10px; */
	background-color: #007aff;
	display: none;
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

.markx {
	position: fixed;
	top: 30%;
	left: 50%;
	width: 80%;
	padding: 30rpx 20rpx;
	margin-left: -40%;
	/* height: 300rpx; */
	background-color: #fff;
	-moz-box-shadow: 0px 0px 2px 3px #ccc;
	-webkit-box-shadow: 0px 0px 2px 3px #ccc;
	box-shadow: 0px 0px 2px 3px #ccc;
	border-radius: 20rpx;
	z-index: 1000;
	overflow: hidden;
	box-sizing: border-box;
}
.markx view:first-child {
	font-size: 32rpx;
	white-space: pre-wrap;
	word-wrap: break-word;
	word-break: break-all;
}

.markx view:last-child {
	font-size: 32rpx;
	margin-top: 30rpx;
}
.markx view:last-child text {
	width: 25%;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 20rpx;
	margin-left: 30rpx;
	background-color: #007aff;
	color: #fff;
	float: left;
	display: inline-block;
}

.markx view:last-child text:last-child {
	float: right;
	margin-right: 30rpx;
}

.mardd {
	position: fixed;
	left: 0rpx;
	top: 0rpx;
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.5;
	z-index: 999;
}
</style>
