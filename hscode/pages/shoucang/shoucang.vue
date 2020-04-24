<template>
	<view>
		<view v-if="userToken">
			<view class="list" v-for="(item, index) in lists" :key="index">
				<view @click="country(item.id)">
					<text>{{ item.countryName1 }}</text>
					<image src="../../static/image/zjt.png"></image>
					<text>{{ item.countryName2 }}</text>
				</view>
				<view @click="country(item.id)">HScode：{{ item.hscode1 }}</view>
				<view @click="country(item.id)">{{ item.createTime | formatDate }}</view>
				<!-- <image src="../../static/image/jt.png"></image> -->
				<view @click="shouchang(item.id)" class="shoucang">{{i18n.quxiaoshouc}}</view>
			</view>
			<view class="loading">{{ loadingText }}</view>
		</view>
		<view class="go_login" v-else>
			<!-- <image src="../../static/image/msg.png" mode=""></image> -->
			<view>您还没有登陆，请登陆后再查看</view>
			<view @click="go_login">去登陆</view>
		</view>
	</view>
</template>

<script>
var _self,
	page = 1,
	timer = null;
export default {
	data() {
		return {
			baseUrl: '',
			lists: [],
			loadingText: '加载中...',
			userToken: false
		};
	},
	filters: {
		formatDate: function(value) {
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y + M + D + h + m + s;
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
		if (token == '' || token == null || token == undefined) {
			this.userToken = false;
		} else {
			this.userToken = true;
		}
		
		uni.setNavigationBarTitle({
			title: this.$t('index.shoucangs')
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
		go_login() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		country(id) {
			uni.navigateTo({
				url: '../jilujieguo/jilujieguo?id=' + id
			});
		},
		// 上拉下拉时调用
		getmorenews: function() {
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			// console.log(this.baseUrl);
			// console.log(token);
			if (_self.loadingText != '' && _self.loadingText != '加载更多') {
				return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url: this.baseUrl + '/api/log?is_collect=1&count=10&page=' + page,
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
					_self.lists = _self.lists.concat(res.data.data);

					_self.loadingText = '加载更多';
					uni.hideNavigationBarLoading();
				}
			});
		},
		// 初始化时调用/
		getnewsList: function() {
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			// console.log(this.baseUrl);
			// console.log(token);
			page = 1;
			uni.showNavigationBarLoading();
			uni.request({
				url: this.baseUrl + '/api/log?is_collect=1&count=10&page=' + page,
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					page++;
					// _self.newsList = res.data.split('--hcSplitor--');
					// console.log(res.data.data[0].airport1);
					_self.lists = res.data.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					_self.loadingText = '加载更多';
				}
			});
		},
		shouchang(e) {
			console.log(e);
			var that = this;
			that.baseUrl = that.websiteUrl;
			let token = uni.getStorageSync('storage_token');

			uni.request({
				url: that.baseUrl + '/api/collect',
				data: {
					ids: e,
					status: '0'
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
						that.getnewsList();
						// that.getmorenews();
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
						that.getnewsList();
					}
				}
			});
		},
		onNavigationBarButtonTap() {
			console.log('你点击了按钮');
		}
	}
};
</script>

<style>
.list {
	position: relative;
	margin: 0rpx 30rpx;
	/* height: 110rpx; */
	padding-top: 10rpx;
	padding-bottom: 15rpx;
	padding-left: 30rpx;
	/* height: 300rpx; */
	/* border-bottom: 1px solid #ccc; */
	border-radius: 20rpx;
	margin-top: 40rpx;
	/* -moz-box-shadow:0px 0px 2px 3px #efefef; 
	        -webkit-box-shadow:0px 0px 2px 3px #efefef;
	         box-shadow:0px 0px 2px 3px #efefef; */
	background-color: #1676fe;
	overflow: hidden;
	box-sizing: border-box;
}
.list view:first-child {
	font-size: 32rpx;
	color: #444;
}
.list view:nth-child(2),
.list view:nth-child(3) {
	font-size: 30rpx;
	height: 50rpx;
	margin-top: 10rpx;
	margin-left: 6rpx;
}
.list view:first-child image {
	width: 60rpx;
	height: 35rpx;
	margin: 0rpx 10rpx;
	vertical-align: middle;
}

.list view {
	color: #fff !important;
}
.list image:nth-child(4) {
	position: absolute;
	top: 35rpx;
	right: 0rpx;
	width: 50rpx;
	height: 50rpx;
}
.loading {
	text-align: center;
	color: #999;
	font-size: 28rpx;
	margin: 10px;
}

.list .shoucang {
	position: absolute;
	right: 20rpx;
	top: 60rpx;
	width: 140rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 30rpx;
	text-align: center;
	background-color: #fff;
	color: #007aff !important;
	font-size: 26rpx;
}

.go_login {
	position: fixed;
	left: 50%;
	top: 30%;
	width: 90%;
	margin-left: -45%;
}

.go_login image {
	width: 100%;
	height: 400rpx;
}

.go_login view:first-child {
	color: #888;
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
	background-color: #007aff;
	font-size: 32rpx;
}
</style>
