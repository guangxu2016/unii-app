<template>
	<view class="detail">
		<view>
			<text>查询类型:</text>
			<text>1个</text>
		</view>
		<view>
			<text>查询条件:</text>
			<text>123467890</text>
		</view>
		<view>
			<text>查询时间:</text>
			<text>2020-02-02 22:00</text>
		</view>
		<view>
			<text style="letter-spacing: 10rpx;">出发国:</text>
			<text>中国</text>
		</view>
		<view>
			<text style="letter-spacing: 10rpx;">目标国:</text>
			<text>美国</text>
		</view>
		<view>
			<text>付款方式:</text>
			<text>代币</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
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
	height: 60rpx;
	line-height: 60rpx;
}
.detail text {
	font-size: 30rpx;
}
.detail view text:first-child {
	color:#555;
}
.detail view text:last-child {
	color:#333;
}
.detail view:first-child text:last-child,
.detail view:nth-child(2) text:last-child,
.detail view:nth-child(3) text:last-child,
.detail view:nth-child(6) text:last-child {
	margin-left: 10rpx;
}
</style>
