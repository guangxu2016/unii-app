<template>
	<view>
		<view class="set">
			<view @click="xieyi">
				<text>{{ i18n.userAgreement }}</text>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
			<view @click="zhengce">
				<text>{{ i18n.privacyPolicy }}</text>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
			<view @click="aboutUs">
				<text>{{ i18n.about }}</text>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
			<view @click="password">
				<text>{{i18n.changepass}}</text>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
			<view @click="changeUs">
				<text>{{ i18n.switchingUsers }}</text>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
				title: this.$t('index.set')
		})		
	},
	methods: {
		xieyi(){
			uni.navigateTo({ 
				url: "../yonghuxieyi/yonghuxieyi"
			});
		},
		zhengce(){
			uni.navigateTo({ 
				url: "../yinsizhengce/yinsizhengce"
			});
		},
		aboutUs(){
			uni.navigateTo({ 
				url: "../aboutUS/aboutUS"
			});
		},
		password(){
			uni.navigateTo({
				url: "../setting/setting"
			});
		},
		changeUs(){
			uni.showModal({
			    title: '提示',
			    content: '确认退出当前账号',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
						uni.removeStorageSync('storage_token');
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 800
						});
						uni.navigateTo({
							url: '../login/login'
						});
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			
		}
	}
};
</script>

<style>
.set view {
	height: 90rpx;
	line-height: 90rpx;
	width: 90%;
	margin: 0 auto;
	border-bottom: 1px solid #ccc;
	overflow: hidden;
}
.set view text {
	float: left;
	color: #555;
	font-size: 32rpx;
}

.set view image {
	display: block;
	width: 40rpx;
	height: 40rpx;
	float: right;
	margin-top: 20rpx;
}
</style>
