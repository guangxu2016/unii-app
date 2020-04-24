<template>
	<view class="input_box">
		<view class="langu" @tap="changeLangu">
			
			<!-- <image class="country" :src="i18n.img" ></image> -->
			<text>{{i18n.language}}</text>
			<!-- <button type="primary" @tap="change">切换语言</button> -->
		</view>
		<view class="logo">
			<image src="../../static/image/logo.png"></image>
		</view>
		<view class="input"><input v-model="username" :valueww="username" @input="messagesearch" type="text" :placeholder="i18n.pleaseZhangHao" /></view>
		<view class="input"><input v-model="password" :valueww="password" @input="passwordsearch" type="password" :placeholder="i18n.pleasePassword" /></view>
		<view class="input yan">
			<input v-model="code" :valueww="code" @input="codesearch" type="text" :placeholder="i18n.pleaseYanMa" />
			<!-- <text @click="codeClick">获取验证码</text> -->
				<image @click="yan_ma" :src="imgs"></image>
		</view>
		<view class="agree">
			<radio @click="change" :value="msg" checked="true" v-if="show" />
			<radio @click="change" :value="msg" v-else />
			<view>
				<text>{{i18n.yueDuTongYi}}</text>
				<text @click="yinsi" class="xieyi">《{{i18n.yinSiZhengCe}}》</text>
			</view>
			<view>
				<!-- <text>同意</text> -->
				<text @click="xieyi" class="xieyi">《{{i18n.shiYongXieYi}}》</text>
			</view>
		</view>
		<view @click="loginsxsss" class="submit">{{i18n.login}}</view>
		<view>
			<view class="redister forget" @click="forget">{{i18n.forgetPass}}</view>
			<view class="redister" @click="zhuce">
				{{i18n.toRegister}}
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			show: false,
			username: '',
			password: '',
			code: '',
			msg:"no",
			num:1,
			imgs:"",
			baseUrl:""
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('index.denglu')
		})	
		// console.log('now:' + this.websiteUrl); 
		this.baseUrl = this.websiteUrl;
		this.imgs = this.baseUrl + "/getActivationCode?id=1"
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
					title: this.$t('index.denglu')
				})
			
			}else {
				uni.setNavigationBarTitle({
					title: this.$t('index.denglu')
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
		yan_ma(){
			console.log(this.baseUrl)
			++this.num
			this.imgs = this.baseUrl + "/getActivationCode?id=" + this.num;
		},
		change() {
			this.show = !this.show;
			console.log(this.show);
				
			if(this.show == true){
				this.msg = "yes"
			}else {
				this.msg = "no"
			}
		},
		// codeClick(){
		// 	let username = this.username;
		// 	let password = this.password;
		// 	if (username == '' || username == null || username == undefined) {
		// 		uni.showToast({
		// 			title: '请输入账号',
		// 			icon: 'none',
		// 			duration: 800
		// 		});
		// 		return false;
		// 	} else if (password == '' || password == null || password == undefined) {
		// 		uni.showToast({
		// 			title: '请输入密码',
		// 			icon: 'none',
		// 			duration: 800
		// 		});
		// 		return false;
		// 	}
		// },
		// 登陆
		loginsxsss() {
			// console.log(this.$refs['bangding'].$attrs.have);
			console.log(this.username);
			let username = this.username;
			let password = this.password;
			let code = this.code;
			console.log(this.msg);
			let agree = this.msg;
			if (username == '' || username == null || username == undefined) {
				uni.showToast({
					title: '请输入账号',
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
			} else if (code == '' || code == null || code == undefined) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none',
					duration: 800
				});
				return false;
			}else if(agree == "no") {
				uni.showToast({
				    title: "您还没有同意隐私和协议",
					icon:"none",
				    duration: 800
				});
				return false;
			}else if (agree == "yes"){
				
				uni.request({
					url: this.baseUrl + '/api/login',
					method: 'post',
					data: {
						account:username,
						password:password,
						code:code
					},
header:{
						'content-type':"application/x-www-form-urlencoded"
					},					
					success: res => {
						console.log(res.data);
						
						// uni.showToast({
						//     title: res.data.msg,
						// 	icon:"none",
						//     duration: 500
						// });
						if(res.data.code == "200") {
							// console.log(res.data.data.token);
							uni.setStorage({
							    key: 'storage_token',
							    data: res.data.data.token,
							    success: function () {
							        console.log('success');
							    }
							});
							
							uni.setStorage({
							    key: 'num',
							    data: "1",
							    success: function () {
							        console.log('success');
							    }
							});
							
							uni.showToast({
							    title: res.data.msg,
								icon:"none",
							    duration: 500
							});
							setTimeout(function(){
								uni.switchTab({
								         url: '../index/index'
								});
							},700)
						}else {
							uni.showToast({
							    title: res.data.msg,
								icon:"none",
							    duration: 500
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
		zhuce(){
			uni.navigateTo({
			         url: '../register/register'
			});
		},
		forget(){
			uni.navigateTo({
			         url: '../forget/forget'
			});
		},
		yinsi() {
			uni.navigateTo({
				url: '../yinsizhengce/yinsizhengce'
			});
		},
		xieyi() {
			uni.navigateTo({
				url: '../yonghuxieyi/yonghuxieyi'
			});
		}
	}
};
</script>

<style>
	.logo {
		width: 40%;
		height:240rpx;
		margin: 0 auto;
		margin-top: 60rpx;
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
}
.input_box .input + .input {
	margin-top: 20rpx;
}
.input_box .input input {
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	border: 0rpx solid #ccc;
	border-bottom:1px solid #ccc;
	border-radius: /* 20rpx */;
	padding-left: 15rpx;
	font-size: 30rpx;
	box-sizing: border-box;
}
.input_box .yan {
	overflow: hidden;
}
.input_box .yan input {
	width: 60%;
	float: left;
}
.yan image {
	width: 35%;
	height: 80rpx;
	text-align: center;
	color: #fff;
	margin-top: 4rpx;
	/* background-color: #1676fe; */
	font-size: 32rpx;
	display: inline-block;
	border-radius: 20rpx;
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
	color:#FF9933;
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
	margin-top: 50rpx;
}
.redister {
	float: right;
	font-size: 28rpx;
	color:#008000;
	margin-top:20rpx;
	margin-right: 40rpx;
}

.forget {
	float: left;
	font-size: 28rpx;
	color:#008000;
	margin-top:20rpx;
	margin-left: 40rpx;
}
</style>
