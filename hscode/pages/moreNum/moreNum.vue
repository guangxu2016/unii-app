<template>
	<view>
		<view class="detail">
			<view>{{ i18n.freeNum }}~</view>
			<view class="xuFei" @click="xuFei">{{ i18n.clickXuFei }}</view>
		</view>
		
		<view class="header_top" v-show="flag">
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
		<view class="hide" v-show="flag"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			alipy: true,
			wxpay: false,
			flag:false,
			baseUrl: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		gerenClick() {
			console.log(this.wxpay);
			this.wxpay = true;
			this.alipy = false;
			// if(this.geren == false){
			//     this.qiye = false;
			// }
		},
		qiyeClick() {
			console.log(this.alipy);
			this.wxpay = false;
			this.alipy = true;
			// this.geren = false;
		},
		sure() {
			console.log(this.alipy);
			console.log(this.wxpay);
			this.flag = false;
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
					type: '2',
					vip_id: ''
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
		xuFei() {
			this.flag = true;
		},
		cancel() {
			this.flag = false;
		}
	}
};
</script>

<style>
.detail {
	width: 92%;
	margin: 0 auto;
	/* margin-top: 40rpx; */
	background-color: #fff;
	padding: 30rpx;
	padding-top: 100rpx;
	/* 	border-radius: 20rpx;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf; */
	text-align: center;
	overflow: hidden;
	box-sizing: border-box;
}

.detail view {
	color: #888;
	font-size: 36rpx;
}

.xuFei {
	width: 85%;
	margin: 0 auto;
	margin-top: 80rpx;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 20rpx;
	margin-top: 60rppx;
	background-color: #1676fe;
	color: #fff !important;
	text-align: center;
}
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
	z-index: 1;
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
}
</style>
