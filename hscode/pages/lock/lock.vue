<template>
	<view class="lock">
		<!-- <image @click="back" class="back" src="../../static/image/zyt.png"></image> -->
		<view>
			<text>{{ i18n.codeMa }}:</text>
			<input v-model="code" :values="code" @input="codeSearch" type="text" :placeholder="i18n.plcodeMa" />
		</view>
		<view>
			<text>{{ i18n.codeName }}:</text>
			<input v-model="shop" :valuew="shop" @input="shopSearch" type="text" :placeholder="i18n.plcodeName" />
		</view>
		<view>
			<text>{{ i18n.shenbao }}:</text>
			<input v-model="shenbao" :qsdds="shenbao" @input="shenbaoSearch" type="text" :placeholder="i18n.plshenbao" />
		</view>
		<view>
			<text>{{ i18n.danwei }}:</text>
			<input v-model="danwei" :qazdw="danwei" @input="danweiSearch" type="text" :placeholder="i18n.pldanwei" />
		</view>
		<view>
			<view>
				<text>{{ i18n.youhui }}:</text>
				<input v-model="youhui" :rfds="youhui" @input="youhuiSearch" type="text" :placeholder="i18n.plyouhui" />
			</view>
			<view>
				<text>{{ i18n.putong }}:</text>
				<input v-model="putong" :zxss="putong" @input="putongSearch" type="text" :placeholder="i18n.plputong" />
			</view>
		</view>
		<view>
			<view>
				<text>{{ i18n.guanshui }}:</text>
				<input v-model="chukou" :qadd="chukou" @input="chukouSearch" type="text" :placeholder="i18n.plguanshui" />
			</view>
			<view>
				<text>{{ i18n.tuishuis }}:</text>
				<input v-model="chukous" :valueaww="chukous" @input="chukousSearch" type="text" :placeholder="i18n.pltuishuis" />
			</view>
		</view>
		<view>
			<view>
				<text>{{ i18n.haiguan }}:</text>
				<input v-model="haiguan" :saas="haiguan" @input="haiguanSearch" type="text" :placeholder="i18n.plhaiguan" />
			</view>
			<view>
				<text>{{ i18n.jianyan }}:</text>
				<input v-model="jianyan" :eazsss="jianyan" @input="jianyanSearch" type="text" :placeholder="i18n.pljianyan" />
			</view>
		</view>
		<view>
			<text>{{ i18n.shopmiaoshu }}:</text>
			<input v-model="miaosu" :qtfddd="miaosu" @input="miaosuSearch" type="text" :placeholder="i18n.plshopmiaoshu" />
		</view>

		<view class="mark" v-show="mark">
			<view>请联系相关负责人员</view>
			<view>
				<text>联系人:</text>
				<text>{{ lianxiren }}</text>
			</view>
			<view>
				<text>手机号:</text>
				<text>{{ lianxirentel }}</text>
			</view>
			<view @click="markBtn">确认</view>
		</view>
		<div class="hide" v-show="mark"></div>

		<view class="submit" @click="submit">{{ i18n.makeOrder }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			code: '',
			shop: '',
			shenbao: '',
			danwei: '',
			youhui: '',
			putong: '',
			chukou: '',
			chukous: '',
			haiguan: '',
			jianyan: '',
			miaosu: '',
			mark: false,
			lianxiren: '',
			lianxirentel: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('index.navTitleThree')
		});
		uni.setTabBarItem({
			index: 0,
			text: this.i18n.navTitle
		});
		uni.setTabBarItem({
			index: 1,
			text: this.i18n.navTitleTwo
		});
		uni.setTabBarItem({
			index: 2,
			text: this.i18n.navTitleThree
		});
		uni.setTabBarItem({
			index: 3,
			text: this.i18n.navTitleFour
		});

		this.baseUrl = this.websiteUrl;
		let token = uni.getStorageSync('storage_token');
		// console.log(this.baseUrl);
		// 联系人方式
		uni.request({
			url: this.baseUrl + '/api/getContacts',
			method: 'GET',
			// data: {
			// },
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				token: token
			},
			success: res => {
				console.log(res.data);
				this.lianxiren = res.data.data.mobile;
				this.lianxirentel = res.data.data.person_in_charge;
			},
			fail: () => {},
			complete: () => {}
		});
	},
	methods: {
		codeSearch() {
			console.log(this.code);
		},
		shopSearch() {
			console.log(this.shop);
		},
		shenbaoSearch() {
			console.log(this.shenbao);
		},
		danweiSearch() {
			console.log(this.danwei);
		},
		youhuiSearch() {
			console.log(this.youhui);
		},
		putongSearch() {
			console.log(this.putong);
		},
		chukouSearch() {
			console.log(this.chukou);
		},
		chukousSearch() {
			console.log(this.chukous);
		},
		haiguanSearch() {
			console.log(this.haiguan);
		},
		jianyanSearch() {
			console.log(this.jianyan);
		},
		miaosuSearch() {
			console.log(this.miaosu);
		},
		submit() {
			// 商品编码
			console.log(this.code);
			// 商品名称
			console.log(this.shop);
			// 申报要素
			console.log(this.shenbao);
			// 单位
			console.log(this.danwei);
			// 优惠
			console.log(this.youhui);
			// 普通
			console.log(this.putong);
			// 出口关
			console.log(this.chukou);
			// 出口退
			console.log(this.chukous);
			// 海关
			console.log(this.haiguan);
			// 检验
			console.log(this.jianyan);
			// 描述
			console.log(this.miaosu);

			let token = uni.getStorageSync('storage_token');
			if (token == '' || token == null || token == undefined) {
				uni.showToast({
					title: '请登录后提交',
					icon: 'none',
					duration: 800
				});
				return false;
			}

			var code = this.code;
			var shop = this.shop;
			var shenbao = this.shenbao;
			var danwei = this.danwei;
			var youhui = this.youhui;
			var putong = this.putong;
			var chukou = this.chukou;
			var chukous = this.chukous;
			var haiguan = this.haiguan;
			var jianyan = this.jianyan;
			var miaosu = this.miaosu;
			if (code == '' || code == undefined || code == null) {
				uni.showToast({
					title: '商品编码不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (shop == '' || shop == undefined || shop == null) {
				uni.showToast({
					title: '商品名称不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (shenbao == '' || shenbao == undefined || shenbao == null) {
				uni.showToast({
					title: '申报要素不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (danwei == '' || danwei == undefined || danwei == null) {
				uni.showToast({
					title: '单位不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (youhui == '' || youhui == undefined || youhui == null) {
				uni.showToast({
					title: '优惠税率不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (putong == '' || putong == undefined || putong == null) {
				uni.showToast({
					title: '普通税率不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (chukou == '' || chukou == undefined || chukou == null) {
				uni.showToast({
					title: '出口关税率不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (chukous == '' || chukous == undefined || chukous == null) {
				uni.showToast({
					title: '出口退税率不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (haiguan == '' || haiguan == undefined || haiguan == null) {
				uni.showToast({
					title: '海关监管条件不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (jianyan == '' || jianyan == undefined || jianyan == null) {
				uni.showToast({
					title: '检验检疫类别不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (miaosu == '' || miaosu == undefined || miaosu == null) {
				uni.showToast({
					title: '商品描述不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			uni.showToast({
				title: '提交成功',
				icon: 'none',
				duration: 800
			});
			this.code = '';
			this.shop = '';
			this.shenbao = '';
			this.danwei = '';
			this.youhui = '';
			this.putong = '';
			this.chukou = '';
			this.chukous = '';
			this.haiguan = '';
			this.jianyan = '';
			this.miaosu = '';

			this.mark = true;
			// setTimeout(function() {
			// 	uni.navigateTo({
			// 		url:
			// 			'../weituidetail/weituidetail?code=' +
			// 			code +
			// 			'&shop=' +
			// 			shop +
			// 			'&shenbao=' +
			// 			shenbao +
			// 			'&danwei=' +
			// 			danwei +
			// 			'&youhui=' +
			// 			youhui +
			// 			'&putong=' +
			// 			putong +
			// 			'&chukou=' +
			// 			chukou +
			// 			'&chukous=' +
			// 			chukous +
			// 			'&haiguan=' +
			// 			haiguan +
			// 			'&jianyan=' +
			// 			jianyan +
			// 			'&miaosu=' +
			// 			miaosu
			// 	});
			// }, 800);
		},
		markBtn() {
			this.mark = false;
			this.hide = false;
		}
		// back() {
		// 	uni.switchTab({
		// 		url: '../index/index'
		// 	});
		// }
	}
};
</script>

<style>
.lock {
	/* padding:30rpx; */
	/* font-size: 36rpx; */
	/* color:#444; */
	/* margin: 0 auto; */
	/* text-align: center; */
	width: 100%;
	padding: 30rpx;
	padding-bottom: 50rpx;
	margin: 0 auto;
	/* margin-bottom: 80rpx; */
	background-color: #2c405a;
	/* background-color: ; */
	overflow: hidden;
	box-sizing: border-box;
}

.back {
	width: 40rpx;
	height: 40rpx;
}

.lock > view {
	overflow: hidden;
	height: 80rpx;
	line-height: 80rpx;
	/* border-bottom: 1px solid #fff; */
	background-color: #fff;
	border-radius: 10rpx;
	margin-top: 40rpx;
}
.lock > view text {
	width: 25%;
}
.lock > view text,
.lock > view input {
	float: left;
	height: 80rpx;
	line-height: 80rpx;
	color: #555;
	font-size: 30rpx;
	padding-left: 20rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	/* color: #fff; */
}

.lock > view input {
	padding-left: 20rpx;
	width: 65%;
}

.lock > view:nth-of-type(n + 5) {
	overflow: hidden;
}
.lock > view:nth-of-type(n + 5) view {
	float: left;
	width: 50%;
}
.lock > view:nth-of-type(n + 5) view text {
	width: 57%;
}
.lock > view:nth-of-type(n + 5) view input {
	width: 28%;
}
.lock > view:last-child {
	width: 100%;
}
.lock > view:last-child input {
	width: 70% !important;
}

.submit {
	background-color: #fff;
	color: #007aff;
	width: 240rpx !important;
	margin: 0 auto;
	margin-top: 30rpx;
	line-height: 80rpx;
	height: 80rpx;
	border-radius: 20rpx;
	text-align: center;
	font-size: 32rpx;
}

.hide {
	position: fixed;
	left: 0%;
	top: 0%;
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.8;
	z-index: 9998;
}
.mark {
	position: fixed;
	top: 30% !important;
	left: 50% !important;
	width: 500rpx !important;
	margin-left: -250rpx !important;
	height: 350rpx !important;
	background-color: #fff;
	border-radius: 10rpx !important;
	padding: 20rpx !important;
	/* 	    -moz-box-shadow:0px 0px 2px 3px #ccc; 
	        -webkit-box-shadow:0px 0px 2px 3px #ccc;
	         box-shadow:0px 0px 2px 3px #ccc; */
	overflow: hidden;
	box-sizing: border-box;
	z-index: 9999;
}
.mark view {
	color: #444;
	font-size: 32rpx;
}

.mark view:first-child {
	/* padding-bottom: 20rpx !important; */
	margin-top: -20rpx;
	text-align: center !important;
	border-bottom: 1px solid #ccc !important;
	font-size: 34rpx !important;
	width: 100% !important;
}

.mark view:nth-child(2),
.mark view:nth-child(3) {
	margin-left: 20rpx !important;
	margin-top: 0rpx !important;
	width: 100% !important;
	height: 70rpx;
	line-height: 70rpx;
}
.mark view:nth-child(2) text:first-child,
.mark view:nth-child(3) text:first-child {
	float: left !important;
	width: auto !important;
}
.mark view:last-child {
	position: relative;
	left: 50%;
	margin-left: -110rpx;
	width: 220rpx !important;
	height: 70rpx !important;
	line-height: 70rpx !important;
	text-align: center !important;
	border-radius: 20rpx !important;
	background-color: #007aff !important;
	/* margin: 0 auto !important; */
	margin-top: 30rpx !important;
	color: #fff !important;
}
</style>
