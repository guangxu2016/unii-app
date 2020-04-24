<template>
	<view>
		<view class="qadd" v-if="userToken">
			<view class="logo">
				<image src="../../static/image/logos.png" mode=""></image>
				<text>版本:2020.0418</text>
			</view>
			<view class="message">
				<view>
					<image @longpress="saveimg()" src="../../static/image/1.jpg"></image>
					<image @longpress="saveimgs()" src="../../static/image/2.jpg"></image>
				</view>
				<view>扫描二维码，了解更多相关资讯</view>
			</view>
		</view>
		<view class="go_login" v-else>
			<!-- <image src="../../static/image/msg.png" mode=""></image> -->
			<view>您还没有登陆，请登陆后再查看</view>
			<view @click="go_login">去登陆</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			message: '',
			baseUrl: '',
			userToken: false
		};
	},
	onLoad() {
		let token = uni.getStorageSync('storage_token');
		if (token == '' || token == null || token == undefined) {
			this.userToken = false;
		} else {
			this.userToken = true;
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('index.guanyu')
		});

		this.baseUrl = this.websiteUrl;
		let token = uni.getStorageSync('storage_token');
		console.log(this.baseUrl);
		console.log(token);
		uni.request({
			url: this.baseUrl + '/api/config',
			method: 'get',
			data: {
				type: 'aboutus'
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				token: token
			},
			success: res => {
				console.log(res.data.data);
				this.message = res.data.data;
			},
			fail: () => {},
			complete: () => {}
		});

		
	},
	methods: {
		saveimg() {
			uni.showActionSheet({
				itemList: ['保存到相册'],
				success: res => {
					if (res.tapIndex == 0) {
						uni.showLoading({
							title: '保存中...'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 6000);
						uni.downloadFile({
							url: 'http://wangsw.aiquanyouxuan.vip/qrcode1.png', //网络路径，下载下来
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: 'http://wangsw.aiquanyouxuan.vip/qrcode1.png', //下载后的临时路径
										success: res => {
											//下载完成后在相册里压根找不到
											uni.hideLoading();
											uni.showToast({
												title: '保存成功！'
											});
										}
									});
								}
							}
						});
					}
				}
			});
		},
		saveimgs() {
			uni.showActionSheet({
				itemList: ['保存到相册'],
				success: res => {
					if (res.tapIndex == 0) {
						uni.showLoading({
							title: '保存中...'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 6000);
						uni.downloadFile({
							url: 'http://wangsw.aiquanyouxuan.vip/qrcode2.png', //网络路径，下载下来
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: 'http://wangsw.aiquanyouxuan.vip/qrcode2.png', //下载后的临时路径
										success: res => {
											//下载完成后在相册里压根找不到
											uni.hideLoading();
											uni.showToast({
												title: '保存成功！'
											});
										}
									});
								}
							}
						});
					}
				}
			});
		},
		go_login() {
			uni.navigateTo({
				url: '../login/login'
			});
		}
	}
};
</script>

<style>
.qadd {
	border-top: 1px solid #efefef;
}
.logo {
	position: relative;
	left: 50%;
	top: 30rpx;
	width: 250rpx;
	height: 200rpx;
	margin-left: -135rpx;
}

.logo image {
	width: 100%;
	height: 100%;
}

.logo text {
	position: absolute;
	top: 170rpx;
	left: 0rpx;
	text-align: center;
	width: 100%;
	display: block;
	font-size: 28rpx;
	color: #999;
}

.message {
	text-align: center;
	margin-top: 140rpx;
}

.message view:first-child {
	width: 300rpx;
	margin: 0 auto;
	overflow: hidden;
}

.message view:first-child image {
	float: left;
	height: 150rpx;
	width: 150rpx;
}

.message view:last-child {
	font-size: 28rpx;
	margin-top: 30rpx;
	color: #555;
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
