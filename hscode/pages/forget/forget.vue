<template>
	<view class="input_box">
		<view class="langu" @tap="changeLangu">
			
			<!-- <image class="country" :src="i18n.img" ></image> -->
			<text>{{i18n.language}}</text>
			<!-- <button type="primary" @tap="change">切换语言</button> -->
		</view>
		<view class="logo"><image src="../../static/image/logo.png"></image></view>
		
		<view class="input"><input v-model="username" :valueww="username" @input="messagesearch" type="text" :placeholder="i18n.pleaserRegNum" /></view>
		<view class="input yan">
			<input v-model="code" :valueww="code" @input="codesearch" type="text" :placeholder="i18n.pleaseYanMa" />
			<button type="warn" @click="codeClick" v-if="changess">{{i18n.getYanMa}}</button>
			<button type="warn" @click="codeClick"  :disabled="disabled" v-else>{{this.second}}后重试</button>
		</view>

		<view class="input"><input v-model="password" :valueww="password" @input="passwordsearch" type="password" :placeholder="i18n.pleasePassword" /></view>
		<view class="input"><input v-model="repeat" :valueww="repeat" @input="repeatsearch" type="password" :placeholder="i18n.pleaseAgainPass" /></view>

		<!-- <view class="agree">
			<radio @click="change" :value="ra" checked="true" v-if="show" />
			<radio @click="change" :value="ra" v-else />
			<view>
				<text >{{i18n.yueDuTongYi}}</text>
				<text @click="yinsi" class="xieyi">《{{i18n.yinSiZhengCe}}》</text>
			</view>
			<view>
				<text @click="xieyi" class="xieyi">《{{i18n.shiYongXieYi}}》</text>
			</view>
		</view> -->
		<view @click="login" class="submit">{{i18n.clickSure}}</view>
		<view class="redister" @click="zhuce">{{i18n.goLoginReg}}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			username: '',
			password: '',
			repeat: '',
			code: '',
			qiye: true,
			geren: false,
			msg: '1',
			ra: 'no',
			tishi: '',
			baseUrl: '',
			showText:true,
			second:59,
			disabled:false,
			changess:true
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('index.wangji')
		})	
		// console.log('now:' + this.websiteUrl);
		this.baseUrl = this.websiteUrl;
		// console.log(this.baseUrl);
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		changeLangu() {
			console.log('语言切换');
			const system_info = uni.getStorageSync('system_info');
			system_info.language === 'en' ? (system_info.language = this._i18n.locale = 'zh_CN') : (system_info.language = this._i18n.locale = 'en');
			uni.setStorageSync('system_info', system_info);
			uni.reLaunch({
				url: 'index'
			});
			if(system_info.language === 'en'){
				uni.setNavigationBarTitle({
					title: this.$t('index.wangji')
				})
				
			}else {
				uni.setNavigationBarTitle({
					title: this.$t('index.wangji')
				})
				
			}
		},
		messagesearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.username = event.target.value;
		},
		passwordsearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.password = event.target.value;
		},
		codesearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.code = event.target.value;
		},
		repeatsearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.repeat = event.target.value;
		},
		change() {
			this.show = !this.show;
			if (this.show == true) {
				this.ra = 'yes';
			} else {
				this.ra = 'no';
			}
		},
		gerenClick() {
			console.log(this.geren);
			this.geren = true;
			this.qiye = false;

			this.msg = '2';
		},
		qiyeClick() {
			console.log(this.qiye);
			this.geren = false;
			this.qiye = true;
			this.msg = '1';
		},
		// 获取验证码
		codeClick() {
			let username = this.username;
			let reg = new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$');
			console.log('哈哈' + username.length);
			if (username == '' || username == null || username == undefined) {
				uni.showToast({
					title: '请输入账号',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (username.length == '11') {
				if (!/^1[3456789]\d{9}$/.test(username)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 800
					});
					return false;
				}
			} else if (!reg.test(username)) {
				uni.showToast({
					title: '邮箱格式不正确，请重新输入！',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			console.log(username);
			uni.request({
				url: this.baseUrl + '/api/code',
				method: 'post',
				data: {
					account: username,
					type: 'register'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					console.log(res.data);
					// this.tishi = res.data.msg
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						});
						this.changess = false;
						this.disabled = true
						// console.log("1")
						   this.showText = false
						   var interval = setInterval(() => {
						      --this.second
						   }, 1000)
						   
						   setTimeout(() => {
						      clearInterval(interval)
						      this.showText = true
							  this.second = 59
							  this.disabled = false
							  this.changess = true;
						   }, 60000)
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
		},
		// 注册按钮
		login() {
			console.log(this.username);
			let username = this.username;
			let password = this.password;
			let repeat = this.repeat;
			let code = this.code;
			let agree = this.ra;
			let company = this.msg;

			if (username == '' || username == null || username == undefined) {
				uni.showToast({
					title: '请输入账号',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (code == '' || code == null || code == undefined) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (password == '' || password == null || password == undefined) {
				uni.showToast({
					title: '请输入密码',
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
					title: '两次密码不一致',
					icon: 'none',
					duration: 800
				});
				return false;
			} else {
				uni.request({
					url: this.baseUrl + '/api/forgetPassword',
					method: 'post',
					data: {
						account: username,
						password: password,
						confirm_password: repeat,
						code: code
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 800
							});
							this.username = '';
							this.password = '';
							this.repeat = '';
							this.code = '';
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

				// 上一个页面
				// uni.navigateBack();
				// 首页
				// uni.switchTab({
				//          url: '../index/index'
				// });
			}
		},
		zhuce() {
			uni.navigateTo({
				url: '../login/login'
			});
		}
		// yinsi() {
		// 	uni.navigateTo({
		// 		url: '../yinsizhengce/yinsizhengce'
		// 	});
		// },
		// xieyi() {
		// 	uni.navigateTo({
		// 		url: '../yonghuxieyi/yonghuxieyi'
		// 	});
		// }
	}
};
</script>

<style>
.logo {
	width: 40%;
	height: 240rpx;
	margin: 0 auto;
	margin-top: 62rpx;
}
.logo image {
	width: 100%;
	height: 100%;
}

.langu {
	 position: absolute;
	/* top: 30rpx; */
	/* right: 30rpx; */
	/* width: 120rpx; */
	/* height: 120rpx; */
	margin-left: 20rpx;
	margin-top: 20rpx;
	padding:10rpx 30rpx;
	border-radius: 30rpx;
	background-color: #5C9FFE;
	text-align: center;
	overflow: hidden;
}
.langu image {
	width: 90rpx;
	height: 90rpx;
	float: left;
	vertical-align: middle;
}
.langu text {
	color:#fff;
	font-size: 28rpx;
	float: left;
	vertical-align: middle;
	/* margin-top: 25rpx; */
	margin-left: 10rpx;
	display: inline-block;
}

.header_top {
	padding-left: 40rpx;
	overflow: hidden;
}

.header_top view,
.header_top > text {
	float: left;
	font-size: 28rpx;
}
.header_top view radio {
	transform: scale(0.7);
}
.input_box {
	padding: 2rpx;
	padding-top: 10rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.input_box .input {
	width: 90%;
	height: 90rpx;
	line-height: 90rpx;
	margin: 0 auto;
	margin-top: 20rpx;
}
.input_box .input input {
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	border: 0px solid #ccc;
	border-bottom: 1px solid #ccc;
	/* border-radius: 20rpx; */
	padding-left: 15rpx;
	font-size: 30rpx;
	box-sizing: border-box;
}
.input_box .yan {
	overflow: hidden;
}
.input_box .yan input {
	width: 55%;
	float: left;
}
.yan button {
	width: 40%;
	text-align: center;
	color: #fff;
	background-color: #1676fe;
	font-size: 32rpx;
	display: inline-block;
	border-radius: 10rpx;
	padding: 0rpx;
	margin: 0rpx;
	margin-left: 5%;
}
.agree {
	margin-left: 20rpx;
	overflow: hidden;
}
.agree view,
.agree radio {
	float: left;
}
.agree view {
	margin: 20rpx 0rpx;
	font-size: 24rpx;
}
.xieyi {
	color: #ff9933;
	font-weight: 700;
}
.agree radio {
	display: inline-block;
	margin-top: 10rpx;
	transform: scale(0.7);
}

.submit {
	width: 80%;
	margin: 0 auto;
	text-align: center;
	height: 90rpx;
	line-height: 90rpx;
	color: #fff;
	background-color: #1676fe;
	font-size: 36rpx;
	border-radius: 20rpx;
	margin-top: 40rpx;
}
.redister {
	float: right;
	font-size: 28rpx;
	color: #008000;
	margin-top: 20rpx;
	margin-right: 20rpx;
}
</style>
