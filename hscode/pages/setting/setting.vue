<template>
	<view>
		<view v-if="userToken">
			<!-- <view class="tou_xiang">
				<view class="touxiangicon" @click="upload"><image class="huiyuan_img" :src="image" mode=""></image></view>
			</view> -->
			<view class="phone password">
				<text>{{ i18n.changePassword }}:</text>
				<input v-model="password" :valueww="password" @input="passwordsearch" type="password" value="" />
			</view>
			<view class="phone">
				<text>{{ i18n.surePassword }}:</text>
				<input v-model="repeat" :valueww="repeat" @input="repeatsearch" type="password" value="" />
			</view>
			<view @click="submit" class="sure">{{ i18n.changSure }}</view>
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
			iconcheck: 0, //头像是否改变
			image: '', //默认头像
			password: '',
			repeat: '',
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
		// console.log('now:' + this.websiteUrl);
		this.baseUrl = this.websiteUrl;
		// console.log(this.baseUrl);
		this.userinfo();
		
		uni.setNavigationBarTitle({
				title: this.$t('index.changemsg')
		})	
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		go_login() {
			uni.navigateTo({
				url: '../login/login'
			});
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
						// that.userName = res.data.data.account;
						// that.days = res.data.data.vip_balance_days;
						that.image = res.data.data.portrait;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
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
					if (res.data == '200') {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
						this.userinfo();
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
		passwordsearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.password = event.target.value;
		},
		repeatsearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.repeat = event.target.value;
		},
		submit() {
			let token = uni.getStorageSync('storage_token');
			let password = this.password;
			let repeat = this.repeat;
			console.log(token);
			if (token == '') {
				uni.showToast({
					title: '请登录后修改',
					icon: 'none',
					duration: 800
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../login/login'
					});
				}, 1000);
				return false;
			}
			if (password == '' || password == null || password == undefined) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (password.length < 6) {
				uni.showToast({
					title: '密码长度不能低于6位',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (repeat == '' || repeat == null || repeat == undefined) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (repeat != password) {
				uni.showToast({
					title: '两次密码输入不一致',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			uni.request({
				url: this.baseUrl + '/api/resetPassword',
				method: 'POST',
				data: {
					password: password,
					confirm_password: repeat
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
						this.password = '';
						this.repeat = '';
					} else if (res.data.code == '203') {
						uni.showToast({
							title: '请登录',
							icon: 'none',
							duration: 800
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '../login/login'
							});
						}, 1000);
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style>
	page {
		padding-top: 50rpx;
		overflow: hidden;
		box-sizing: border-box;
		
	}
.phone {
	/* padding: 30rpx; */
	width: 85%;
	margin: 0 auto;
	margin-top: 50rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.password {
	padding-top: 0rpx;
}
.phone + .phone {
	padding-top: 30rpx;
}
.phone text {
	float: left;
	font-size: 30rpx;
}

.phone input {
	border: none;
	outline: none;
	border-bottom: 1px solid #ccc;
	font-size: 32rpx;
	width: 50%;
	margin-left: 20rpx;
	float: left;
}

.sure {
	width: 240rpx;
	margin: 0 auto;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 10rpx;
	color: #fff;
	font-size: 32rpx;
	background-color: #007aff;
	margin-top: 50rpx;
}
.tou_xiang {
	padding: 30rpx;
	overflow: hidden;
	box-sizing: border-box;
}

.tou_xiang text {
	float: left;
	font-size: 32rpx;
	vertical-align: middle;
	margin-top: 50rpx 0rpx;
}

.tou_xiang > view {
	/* float: right; */
	width: 120rpx;
	height: 120rpx;
	margin: 0 auto;
	margin-top: 50rpx;
	margin-bottom: 50rpx;
}
.tou_xiang > view image {
	width: 100%;
	display: block;
	height: 100%;
	vertical-align: middle;
	border-radius: 50%;
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
