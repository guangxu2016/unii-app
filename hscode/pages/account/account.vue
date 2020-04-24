<template>
	<view>
		<view v-if="flag">
			<view>
				<view class="detail" v-if="vip1 == 1">
					<view>
						<text>{{ i18n.yonghumingcheng }}:</text>
						<text>{{username}}</text>
					</view>
					<view>
						<text>{{ i18n.chaxunleixing }}:</text>
						<text>已知多边HScode</text>
					</view>
					<view>
						<text>{{ i18n.daoshishijain }}:</text>
						<text>{{vip_expire_date}}</text>
					</view>
					<view>
						<text>{{ i18n.iscompany }}:</text>
						<text v-if="is_company == 1">公司</text>
						<text v-if="is_company == 2">个人</text>
					</view>
				</view>
				<view v-else></view>
				<view class="detail" v-if="vip2 == 1">
					<view>
						<text>{{ i18n.yonghumingcheng }}:</text>
						<text>{{username}}</text>
					</view>
					<view>
						<text>{{ i18n.chaxunleixing }}:</text>
						<text>仅知商品描述</text>
					</view>
					<view>
						<text>{{ i18n.daoshishijain }}:</text>
						<text>{{vip_expire_dates}}</text>
					</view>
					<view>
						<text>{{ i18n.iscompany }}:</text>
						<text v-if="is_company == 1">公司</text>
						<text v-if="is_company == 2">个人</text>
					</view>
				</view>
				<view v-else></view>
				<view class="detail" v-if="vip3 == 1">
					<view>
						<text>{{ i18n.yonghumingcheng }}:</text>
						<text>{{username}}</text>
					</view>
					<view>
						<text>{{ i18n.chaxunleixing }}:</text>
						<text>已知单边HScode</text>
					</view>
					<view>
						<text>{{ i18n.daoshishijain }}:</text>
						<text>{{vip_expire_datess}}</text>
					</view>
					<view>
						<text>{{ i18n.iscompany }}:</text>
						<text v-if="is_company == 1">公司</text>
						<text v-if="is_company == 2">个人</text>
					</view>
				</view>
				<view v-else></view>
			</view>
		</view>
		<view v-else>
			<view class="asas">
				<view v-if="bbb == 1">
					<text>免费会员</text>
					<text>已知多边HScode</text>
				</view>
				<view v-else-if="bbb == 2">
					<text>免费会员</text>
					<text>仅知商品描述</text>
				</view>
				<view v-else>
					<text>免费会员</text>
					<text>已知单边HScode</text>
				</view>
				<view>
					<text>剩余免费查询次数:</text>
					<text>{{aaa}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			days:"",
			vip_expire_date:"",
			vip_expire_dates:"",
			vip_expire_datess:"",
			is_company:"",
			username:"",
			vip1:"",
			vip2:"",
			vip3:'',
			aaa:"",
			bbb:"",
			flag:true
		};
	},
	onLoad() {
		this.userinfo();
		uni.setNavigationBarTitle({
			title: this.$t('index.zhanghus')
		})	
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
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
						if(res.data.data.vip1_expire_date == "" || res.data.data.vip1_expire_date == undefined || res.data.data.vip1_expire_date == undefined || res.data.data.vip2_expire_date == "" || res.data.data.vip2_expire_date == undefined || res.data.data.vip2_expire_date == undefined || res.data.data.vip3_expire_date == "" || res.data.data.vip3_expire_date == undefined || res.data.data.vip3_expire_date == undefined){
						that.aaa = res.data.data.balance_count;
						that.bbb = res.data.data.is_vip;
							console.log("11")
							that.flag = false;
						}else {
							that.flag = true;
							that.days = res.data.data.vip_balance_days || 0;
							that.vip_expire_date = res.data.data.vip1_expire_date;
							that.vip_expire_dates = res.data.data.vip2_expire_date;
							that.vip_expire_datess = res.data.data.vip3_expire_date;
							that.is_company = res.data.data.is_company;
							that.username = res.data.data.account;
							that.vip1 = res.data.data.is_vip1;
							that.vip2 = res.data.data.is_vip2;
							that.vip3 = res.data.data.is_vip3;
						}
						
						
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
	background-color: #007AFF;
	padding: 30rpx;
	border-radius: 20rpx;
/* 	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf; */
	overflow: hidden;
	box-sizing: border-box;
}
.asas {
	width: 92%;
		margin: 0 auto;
		 margin-top: 40rpx; 
		background-color: #007AFF;
		padding: 30rpx;
		border-radius: 20rpx;
	/* 	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
		-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
		box-shadow: 0px 0px 2px 3px #dfdfdf; */
		overflow: hidden;
		box-sizing: border-box;
}
.detail view,
.asas view {
	height: 60rpx;
	line-height: 60rpx;
}
.detail text,
.asas text {
	font-size: 32rpx;
	display: inline-block;
}
.detail view text:first-child {
	color:#fff;
	width: 45%;
}
.asas view text:first-child {
	width: 45%;
	color:#fff;
}
.detail view text:last-child,
.asas view text:last-child {
	color:#fff;
}

</style>
