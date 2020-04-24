<template>
	<view>
		<view class="detail" v-if="shows">
			<view v-for="item in list" :key="item.id" >
				<text v-if="system_info == 'zh_CN'">{{item.cn_name}}:</text>
				<text v-else>{{item.en_name}}:</text>
				<text>{{item.value}}</text>
			</view>
		
			<!-- <view>
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
			</view> -->
		</view>
		<view v-else class="zanwu">
			暂无数据，请核对下查询记录
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			system_info:"",
			shows:true
		};
	},

	onLoad(option) {
		console.log(option.id);
		this.detail(option.id);
		const system_info = uni.getStorageSync('system_info');
		console.log(system_info.language);
		this.system_info = system_info.language;
		
		uni.setNavigationBarTitle({
				title: this.$t('index.jilus')
		})	
	},
	methods: {
		detail(id) {
			var that = this;
			that.baseUrl = that.websiteUrl;
			let token = uni.getStorageSync('storage_token');

			uni.request({
				url: that.baseUrl + '/api/logDetail',
				data: {
					id: id
				},
				method: 'GET',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: function(res) {
					console.log(res.data);
					console.log(res.data.data);
					if(res.data.data == "" || res.data.data == null || res.data.data == undefined){
						that.shows = false;
						console.log("111")
						return false;
						
					}
					if (res.data.code == 200) {
						
						// console.log(that.list);

						if(res.data.data.data == undefined) {
							that.list = res.data.data[0].data;
						}else {
							that.list = res.data.data.data;
						}
						// console.log(that.list.value);
					}
				}
			});
		}
	}
};
</script>

<style>
.detail {
	width: 92%;
	margin: 0 auto;
	margin-top: 40rpx;
	background-color: #fff;
	padding: 20rpx;
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
	color: #555;
}
.detail view text:last-child {
	color: #333;
}
.detail view text:last-child {
	margin-left: 10rpx;
}

.detail view text:last-child {
	/* font-weight: 700; */
	color: #000000;
}

.zanwu {
	text-align: center;
	margin-top: 200rpx;
	color:#888;
	font-size: 32rpx
}
</style>
