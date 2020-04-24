<template>
	<view>
		<view class="sdas"  v-if='userToken'>
			<text>{{message}}</text>
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
				message:[],
				baseUrl: '',
				userToken:false
			}
		},
		onLoad() {
			let token = uni.getStorageSync('storage_token');
					if(token == "" || token == null || token == undefined){
						this.userToken = false
					}else {
						this.userToken = true;
					}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.$t('index.xieyi')
			})	
			
			this.baseUrl = this.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			console.log(this.baseUrl);
			console.log(token);
			uni.request({
				url: this.baseUrl + '/api/config',
				method: 'get',
				data: {
					type:"agreement"
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					// console.log(res.data.data);
					let remarkStr ='';
					// remarkStr = res.data.data.replace(/\n/g,'<view></view>')
					
					// console.log(this.message);
					// this.message = res.data.data;
					const system_info = uni.getStorageSync('system_info');
					console.log(system_info.language);
					if(system_info.language == "zh_CN"){
						remarkStr = res.data.data.cn.replace('\g','')
						this.message = remarkStr;
					}else {
						remarkStr = res.data.data.en.replace('\g','')
						this.message = remarkStr;
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			go_login(){
						uni.navigateTo({
							url:"../login/login"
						})
					},
		}
	}
</script>

<style>
.sdas {
	padding: 30rpx;
	/* text-indent: 30rpx; */
	font-size: 28rpx;
	white-space: pre-wrap;
	word-wrap: break-word;
	word-break: break-all;
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
