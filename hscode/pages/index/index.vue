<template>
	<view class="content">
		<view class="banner">
			<image class="img" src="../../static/image/banner.png"></image>
			<view @tap="change">
				<text>{{ i18n.language }}</text>
				<!-- <image class="country" :src="i18n.img" ></image> -->
				<!-- <button type="primary" @tap="change">切换语言</button> -->
			</view>
			<!-- <text class="fuwupingtai">{{i18n.pingtai}}</text> -->
			<!-- <image class="fuwupingtai" src="../../static/image/teggs.png"></image> -->
	<strong></strong>	</view>
		<view class="con_msg">
			<view class="con_msg_list yizhi" @click="codeQuery">
				<image src="../../static/image/yz.png"></image>
				<view>
					<view>{{ i18n.yizhi }}</view>
					<view>{{ i18n.chaxun }}</view>
				</view>
			</view>
		
			<view class="con_msg_list zhuanyi" @click="zhuanYi">
				<image src="../../static/image/zy.png"></image>
				<view>
					<view>{{ i18n.Intelligent }}</view>
					<view>{{ i18n.chaxun }}</view>
				</view>
			</view>
			<view class="con_msg_list miaoshu" @click="shoppingqQuery">
				<image src="../../static/image/ms.png"></image>
				<view>
					<view>{{ i18n.describe }}</view>
					<view>{{ i18n.chaxun }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			baseUrl: ''
		};
	},
	onShow() {
		// console.log('now:' + this.websiteUrl);
		this.baseUrl = this.websiteUrl;
		// console.log(this.baseUrl);
		uni.setNavigationBarTitle({
			title: this.$t('index.pingtai')
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
	},
	
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		change() {
			const system_info = uni.getStorageSync('system_info');
			system_info.language === 'en' ? (system_info.language = this._i18n.locale = 'zh_CN') : (system_info.language = this._i18n.locale = 'en');
			uni.setStorageSync('system_info', system_info);
			uni.reLaunch({
				url: 'index'
			});
			if(system_info.language === 'en'){
				uni.setNavigationBarTitle({
					title: this.$t('index.pingtai')
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
			}else {
				uni.setNavigationBarTitle({
					title: this.$t('index.pingtai')
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
			}
			
		},
		codeQuery() {
			uni.navigateTo({
				url: '../codeQuery/codeQuery'
			});
			// uni.navigateTo({ url: '../login/login'});
		},
		shoppingqQuery() {
			uni.navigateTo({
				url: '../miaoshuchaxun/miaoshuchaxun'
			});
		},
		zhuanYi() {
			uni.navigateTo({
				url: '../zhuanyi/zhuanyi'
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f7f7f7;
}
.content {
	width: 100%;
}
.banner {
	position: relative;
	width: 100%;
	height: 600rpx;
}

.banner .img {
	width: 100%;
	height: 100%;
}

.banner view {
	position: absolute;
	top: 30rpx;
	right: 30rpx;
	/* width: 120rpx; */
	/* height: 120rpx; */
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	background-color: #5c9ffe;
	text-align: center;
	overflow: hidden;
}
.fuwupingtai {
	/* position: absolute;
	top:20rpx;
	left: 20rpx;
	color:#fff;
	font-weight: 700;
	font-size: 32rpx; */
	position: absolute;
	left: 20rpx;
	top:10rpx;
	width: 200rpx;
	height: 100rpx;
}

.teg {
	/* position: absolute;
	left: 20rpx;
	top:70rpx;
	width: 200rpx;
	height: 100rpx; */
}

.banner view image {
	width: 110rpx;
	height: 110rpx;
	float: left;
	vertical-align: middle;
}
.banner view text {
	color: #fff;
	font-size: 28rpx;
	/* float: left; */
	display: block;
	vertical-align: middle;
	/* margin-top: 35rpx; */
	margin-right: 10rpx;
}
/* .banner button {
	position: absolute;
	top: 20rpx;
	right: 30rpx;
} */
.con_msg {
	position: relative;
	padding: 50rpx 30rpx;
	width: 90%;
	margin: 0 auto;
	/* padding-bottom: 50px; */
	margin-top: -150rpx;
	/* 	border-radius: 20rpx;
	background-color: #ffffff;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf; */
	box-sizing: border-box;
}
.con_msg .con_msg_list {
	position: relative;
	/* border: 1px solid #ccc; */
	border-radius: 15rpx;
	height: 160rpx;
	line-height: 160rpx;
	padding: 0rpx /* 20rpx */;
	text-align: center;
	padding-left: 40rpx;
	border-radius: 80rpx;
	/* background-color: #2198f2; */
	color: #fff;
	box-sizing: border-box;
}
.con_msg_list + .con_msg_list {
	margin-top: 50rpx;
}

.con_msg .con_msg_list image {
	position: absolute;
	top: 40rpx;
	left: 50rpx;
	width: 80rpx;
	height: 80rpx;
}
.con_msg .con_msg_list > view {
	line-height: 60rpx;
	padding-top: 30rpx;
	padding-left: 36rpx;
}

.yizhi > view view:first-child {
	color: #4c4495;
	font-size: 38rpx;
	font-weight: 700;
}

.yizhi > view view:last-child {
	color: #fff;
	font-size: 28rpx;
}

.miaoshu > view view:first-child {
	color: #fff;
	font-size: 38rpx;
	font-weight: 700;
}

.miaoshu > view view:last-child {
	color: #ccc;
	font-size: 28rpx;
}

.zhuanyi > view view:first-child {
	color: #fff;
	font-size: 38rpx;
	font-weight: 700;
}

.zhuanyi > view view:last-child {
	/* color: #bb73ff; */
	color: #ccc;
	font-size: 28rpx;
}
.yizhi {
	 /* background: #e4dbd1; */
	 /* background-color: #fff; */
	    /* background: #8999bd; */
	    background-color:#c7d1e8;
	 
}
.miaoshu {
	 background: #1358f6; 
	/* background-color: #333789; */
	/* background-size: 100% 100%; */
}

.zhuanyi {
	background: #8a01ec; 
	/* background-color: #7446b0; */
	/* background-size: 100% 100%; */
}

.con_msg_list image {
	float: left;
}

.con_msg_list view {
	color: #444;
	font-size: 32rpx;
}
/* .uni-tabbar,
.uni-tabbar .uni-tabbar {
	height: 200rpx !important;
} */

</style>
