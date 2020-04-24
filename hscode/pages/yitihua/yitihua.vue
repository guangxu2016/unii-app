<template>
	<view class="content">
		<view v-if='userToken'>
		<view class="list" v-for="(item,index) in newsList" :key="index">
			<view>
				<text>{{ item.countryName1 }}</text>
				<image src="../../static/image/zjt.png"></image>
				<text>{{ item.countryName2 }}</text>
			</view>
			<view>
				<text>姓名:{{ item.realName }}</text>
				<!-- <image src="../../static/image/zjt.png"></image> -->
				<text>手机号:{{ item.phone }}</text>
			</view>
			<view>
				<view>
					<text>体积:</text>
					<text>{{item.volume}}KG</text>
				</view>
				<view>
					<text>毛重:</text>
					<text>{{item.weight}}KG</text>
				</view>
			</view>
			<view>
				<!-- {{item.createTime}} -->
				{{item.createTime | formatDate}}
			</view>
			<!-- <view class="as">收藏</view> -->
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
			newsList: [],
			loadingText: '加载中...',
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
				title: this.$t('index.yitihuas')
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
			// console.log(this.baseUrl);
			// console.log(token);
			if (_self.loadingText != '' && _self.loadingText != '加载更多') {
				return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url: this.baseUrl + '/api/getYitihuaList?count=10&page=' + page,
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
				_self.newsList = _self.newsList.concat(res.data.data);
					
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
				url: this.baseUrl + '/api/getYitihuaList?count=10&page=' + page,
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					page++;
					// _self.newsList = res.data.split('--hcSplitor--');
					// console.log(res.data.data[0].airport1);
					_self.newsList = res.data.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					_self.loadingText = '加载更多';
				}
			});
		}
	}
};
</script>

<style>
.list {
	position: relative;
	margin: 0rpx 30rpx;
	/* height: 110rpx; */
	padding-top: 20rpx;
	padding-left: 30rpx;
	/* padding-bottom: 15rpx; */
	/* border-bottom: 1px solid #ccc; */
	/* height: 200rpx; */
	border-radius: 20rpx;
	margin-top: 40rpx;
	    /* -moz-box-shadow:0px 0px 2px 3px #efefef; 
	        -webkit-box-shadow:0px 0px 2px 3px #efefef;
	         box-shadow:0px 0px 2px 3px #efefef; */
			 background-color: #1676fe;
	overflow: hidden;
	box-sizing: border-box;
}
.list view:first-child,
.list view:nth-child(2) {
	font-size: 32rpx;
	color: #fff;
}
.list view {
	font-size: 32rpx;
	color: #fff;
	height: 60rpx;
}
.list view:nth-child(3) {
	overflow: hidden;
}

.list view:nth-child(3) view {
	float: left;
}
.list view:nth-child(3) view:last-child {
	margin-left: 40rpx;
}
/* .list view:nth-child(2){
	font-size: 24rpx;
	margin-left: 6rpx;
} */
.list view:nth-child(2) text:last-child{
	margin-left: 20rpx;
}
.list view:first-child image,
.list view:nth-child(2) image{
	width: 60rpx;
	height: 35rpx;
	margin: 0rpx 10rpx;
	vertical-align: middle;
}

.as {
	position: absolute;
	right: 0rpx;
	top: 30rpx;
	width: 100rpx;
	height: 60rpx;
	line-height: 60rpx;
	background-color: #007aff;
	color: #fff !important;
	text-align: center;
	border-radius: 10rpx;
	font-size: 30rpx;
}

.content {
	/* height: 100%; */
	width: 100%;
	overflow: auto;
}

.loading {
	text-align: center;
	color:#999;
	font-size:28rpx;
	margin: 10px;
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
