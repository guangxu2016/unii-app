<template>
	<view class="detail">
		<view>
			<text>商品编码:</text>
			<text>{{code}}</text>
		</view>
		<view>
			<text>商品名称:</text>
			<text>{{shop}}</text>
		</view>
		<view>
			<text>申报要素:</text>
			<text>{{shenbao}}</text>
		</view>
		<view>
			<text>法定单位:</text>
			<text>{{danwei}}</text>
		</view>
		<view>
			<text>最恵国进口优惠:</text>
			<text>{{youhui}}</text>
		</view>
		<view>
			<text>普通进口税率:</text>
			<text>{{putong}}</text>
		</view>
		<view>
			<text>出口关税率:</text>
			<text>{{chukou}}</text>
		</view>
		<view>
			<text>出口退税率:</text>
			<text>{{chukous}}</text>
		</view>
		<view>
			<text>海关监管条件:</text>
			<text>{{haiguan}}</text>
		</view>
		<view>
			<text>检验检疫类别:</text>
			<text>{{jianyan}}</text>
		</view>
		<view>
			<text>商品描述:</text>
			<text>{{miaosu}}</text>
		</view>
		<view class="submit" @click="sub">
			{{i18n.daochu}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				shop:"",
				shenbao:"",
				danwei:"",
				youhui:"",
				putong:"",
				chukou:"",
				chukous:"",
				haiguan:"",
				jianyan:"",
				miaosu:""
			}
		},
		onLoad(option){
			uni.setNavigationBarTitle({
				title: this.$t('index.weituo')
			})	
			
			this.code = option.code;
			this.shop = option.shop;
			this.shenbao = option.shenbao;
			this.danwei = option.danwei;
			this.youhui = option.youhui;
			this.putong = option.putong;
			this.chukou = option.chukou;
			this.chukous = option.chukous;
			this.haiguan = option.haiguan;
			this.jianyan = option.jianyan;
			this.miaosu = option.miaosu;
		},
		computed: {
			i18n() {
				return this.$t('index');
			}
		},
		methods: {
			sub(){
				uni.showToast({
				    title: "此功能暂未开启~",
					icon:"none",
				    duration: 800
				});
			}
		}
	}
</script>

<style>
.detail {
	width: 92%;
	margin: 0 auto;
	margin-top: 40rpx;
	background-color: #fff;
	padding: 30rpx;
	border-radius: 20rpx;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf;
	overflow: hidden;
	box-sizing: border-box;
}
.detail view {
	/* height: 60rpx; */
	line-height: 50rpx;
}
.detail text {
	font-size: 30rpx;
}
.detail view text:first-child {
	color: #555;
}
.detail view text:last-child {
	color: #333;
}
.detail view text:last-child {
	margin-left: 10rpx;
}

.submit {
	background-color: #007aff;
	color: #fff;
	width: 240rpx !important;
	margin: 0 auto;
	margin-top: 30rpx;
	line-height: 80rpx !important;
	height: 80rpx !important;
	border-radius: 20rpx;
	text-align: center;
	font-size: 32rpx;
}

</style>
