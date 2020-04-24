<template>
	<view class="content">
		<view class="banner"><image src="../../static/image/as.png" mode=""></image></view>
		<view class="content_box">
			<view class="choose">
				<!-- <picker class="picker">
				</picker> -->
				<view @click="first" class="picker" v-if="city_one == ''">
					{{i18n.pleaseChoose}}
				</view>
				<view @click="first" class="picker" v-else>
					{{ city_one }}
				</view>
				<image src="../../static/image/change.png"></image>
				<!-- <picker class="picker" :range="yearss" @change="yearChanges">{{ yearss[yearsIndexs] }}</picker> -->
				<view class="picker" @click="second" v-if="city_two == ''">
					{{ i18n.pleaseChooseCross }}
				</view>
				<view class="picker" @click="second" v-else>
					{{ city_two }}
				</view>
			</view>
			<view class="entry">
				<view><input v-model="search" :valueww="search" @input="messagesearch" type="text" :placeholder="i18n.pleaseHScode" /></view>
			</view>
			<view class="search" @click="searchClick">{{i18n.search}}</view>
		</view>

		<view class="hhhhh" v-show="city_first">
			<view class="chooseBtn">
				<text @click="cancelFirst">取消</text>
				<text @click="sureFirst">确认</text>
			</view>
			<view class="box">
				<view v-for="(index, itemq) in years">
					<text :class="{ checked: isCheck == index }" @click="chooseClick(itemq, index)">{{ index.value }}</text>
				</view>
			</view>
		</view>

		<view class="hhhhh" v-show="city_second">
			<view class="chooseBtn">
				<text @click="cancelSecond">取消</text>
				<text @click="sureSecond">确认</text>
			</view>
			<view class="box">
				<view v-for="(index, itemq) in yearss">
					<text :class="{ checkeds: isChecks == index }" @click="chooseClicks(itemq, index)">{{ index.value }}</text>
				</view>
			</view>
		</view>

		<div class="mark" v-show="error"></div>
		<view class="con_mon" v-show="ok">
			<view class="kou_chu">
				本次查询扣除
				<text>2代币</text>
			</view>
			<view class="yu_e">
				余额:
				<text>120</text>
			</view>

			<view>
				<text @click="sure">确认</text>
				<text @click="cancel">取消</text>
			</view>
		</view>
		<!-- <view @click="haha">点击</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			years: [],
			yearsIndex: 0,
			yearss: [],
			yearsIndexs: 0,
			search: '',
			error: false,
			ok: false,
			city_one: '',
			city_num: '',
			city_first: false,
			city_two: '',
			city_nums: '',
			city_second: false,
			isCheck:0,
			isChecks:0
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
				title: this.$t('index.zhuanyis')
		})	
		// var arr = [];
		// var arr2 = ['请选择', '中国', '美国', '加拿大', '日本'];
		// this.years = arr;
		// this.yearss = arr2;

		uni.request({
			url: 'http://td.gfapki.com.cn:8090/country-indices',
			method: 'GET',
			// data: {

			// },
			success: res => {
				console.log(eval(res.data));
				// var data = eval('(' + JSON.stringify(res.data) + ')');
				//  console.log(Object.entries(res.data))
				// arr = eval(res.data);
				// this.years = res.data;
				// this.yearss = res.data;
				var arr = res.data;
				var arr1 = [];
				var arr2 = [];
				var arr3 = [];
				for (var key in arr) {
					arr1.push(arr[key]);
				}
				arr1.sort();
				for (var i = 0; i < arr1.length; i++) {
					for (var key in arr) {
						if (arr1[i] == arr[key]) {
							console.log('key' + key);
				
							arr2.push({ key: key, value: arr1[i] });
							arr3.push({ key: key, value: arr1[i] });
							break;
						}
					}
				}
				console.log(arr2);
				this.years = arr2;
				this.yearss = arr3;
			},
			fail: () => {},
			complete: () => {}
		});
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		// yearChange: function(e) {
		// 	console.log(e);
		// 	this.yearsIndex = e.detail.value;
		// },
		// yearChanges: function(e) {
		// 	console.log(e);
		// 	this.yearsIndexs = e.detail.value;
		// },
		messagesearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.search = event.target.value;
		},
		chooseClick(num, index) {
			console.log(index.value);
			console.log(index.key);
			this.city_one = index.value;
			this.city_num = index.key;
			this.isCheck = index;
		},
		first() {
			this.city_first = true;
		},
		cancelFirst() {
			this.city_first = false;
			// this.city_one = '请选择';
		},
		sureFirst() {
			this.city_first = false;
			this.city_one = this.city_one;
		},

		chooseClicks(num, index) {
			console.log(index.value);
			console.log(index.key);
			console.log(num);
			this.city_two = index.value;
			this.city_nums = index.key;
			this.isChecks = index;
		},
		second() {
			this.city_second = true;
		},
		cancelSecond() {
			this.city_second = false;
			// this.city_two = '请选择';
		},
		sureSecond() {
			this.city_second = false;
			this.city_two = this.city_two;
		},

		searchClick() {
			console.log(this.search);

			console.log('第一个国家名' + this.city_one);
			console.log('第一个国家索引' + this.city_num);
			console.log('第二个国家名' + this.city_two);
			console.log('第二个国家索引' + this.city_nums);
			let city_num = this.city_num;
			let city_nums = this.city_nums;
			let city_one = this.city_one;
			let city_two = this.city_two;
			let token = uni.getStorageSync('storage_token');
			console.log(token);
			if(token == "") {
				uni.showToast({
					title: '请登录后查询',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			if (city_one == '') {
				uni.showToast({
					title: '请选择国家',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (city_two == '') {
				uni.showToast({
					title: '请选择国家2',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.search == '' || this.search == undefined || this.search == null) {
				uni.showToast({
					title: '商品描述不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			// this.error = true;
			// this.ok = true;

			//  有钱进入结果页面
			// this.error = false;
			// this.ok = false;
			uni.navigateTo({
				url: "../chaxunjieguo/chaxunjieguo?type=zhuanyi&city_one_name="+ city_one +"&city_one_index="+city_num+"&city_two_name="+city_two+"&city_two_index="+city_nums+"&search="+this.search
			});
			// 进入充值页面
			// uni.navigateTo({
			// 	url: '../moreNum/moreNum'
			// });
		},
		sure() {
			//  有钱进入结果页面
			// this.error = false;
			// this.ok = false;
			// uni.navigateTo({
			// 	url: '../chaxunjieguo/chaxunjieguo'
			// });
			// 进入续费页面
			this.error = false;
			this.ok = false;
			uni.navigateTo({
				url: '../moreNum/moreNum'
			});
		},
		cancel() {
			this.error = false;
			this.ok = false;
		}
	}
};
</script>

<style>
.content {
	width: 100%;
}

.banner {
	width: 100%;
	height: 550rpx;
}

.banner image {
	width: 100%;
	height: 100%;
}

.content_box {
	position: relative;
	top: -70rpx;
	width: 92%;
	padding: 40rpx 30rpx;
	padding-bottom: 60rpx;
	border-radius: 20rpx;
	margin: 0 auto;
	background-color: #fff;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf;
	overflow: hidden;
	box-sizing: border-box;
}
.choose {
	width: 100%;
	margin: 0 auto;
	/* margin-top: 30rpx; */
	overflow: hidden;
}
.choose .picker {
	font-size: 32rpx;
	color: #444;
	border-bottom: 1px solid #999;
	width: 43%;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	float: left;
}
.choose image {
	width: 60rpx;
	height: 40rpx;
	float: left;
	vertical-align: middle;
	margin: 0rpx 14rpx;
	margin-top: 15rpx;
}

.entry view {
	width: 100%;
	margin: 0 auto;
	height: 90rpx;
	line-height: 90rpx;
	padding-left: 15rpx;
	border-bottom: 1px solid #ccc;
	/* border: 1px solid #999; */
	/* border-radius: 10rpx; */
	margin-top: 30rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.entry view input {
	height: 90rpx;
	line-height: 90rpx;
	border: none;
	outline: none;
	font-size: 32rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.search {
	width: 85%;
	margin: 0 auto;
	height: 90rpx;
	line-height: 90rpx;
	padding-left: 15rpx;
	border-radius: 20rpx;
	margin-top: 60rpx;
	/* background-color: #008000; */
	background-color: #1676fe;
	color: #fff;
	text-align: center;
}
.mark {
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	width: 100%;
	height: 100%;
	background-color: #000;
	opacity: 0.4;
}

.con_mon {
	position: fixed;
	top: 30%;
	left: 50%;
	margin-left: -250rpx;
	width: 500rpx;
	height: 320rpx;
	background-color: #fff;
	padding-top: 10rpx;
	border-radius: 15rpx;
	text-align: center;
	overflow: hidden;
	box-sizing: border-box;
}
.con_mon view {
	margin-top: 20rpx;
}
.con_mon view image {
	width: 50rpx;
	height: 50rpx;
	vertical-align: middle;
}
.con_mon view text {
	vertical-align: middle;
}
.con_mon view:last-child text {
	width: 40%;
	height: 65rpx;
	line-height: 65rpx;
	text-align: center;
	margin-top: 20rpx;
	font-size: 32rpx;
	display: inline-block;
	border-radius: 40rpx;
	margin-left: 5%;
	color: #fff;
}
.con_mon view:last-child text:first-child {
	background-color: #1676fe;
}
.con_mon view:last-child text:last-child {
	background-color: #b6b6b6;
}

.con_mon .kou_chu text {
	color: #fd3f40;
	margin-left: 5rpx;
}

.con_mon .yu_e text {
	color: #fd3f40;
}
.hhhhh {
	position: fixed;
	bottom: 0%;
	left: 0%;
	width: 100%;

	background-color: #000;
	opacity: 0.9;
	z-index: 22;
	box-sizing: border-box;
}
.box {
	height: 530rpx;
	margin-top: 10rpx;
	overflow: hidden;
	text-align: center;
	overflow-y: auto;
}

.hhhhh text {
	display: block;
	color: #fff;
	font-size: 32rpx;
	height: 50rpx;
	line-height: 50rpx;
}
.chooseBtn {
	overflow: hidden;
}

.chooseBtn text {
	float: left;
	width: 26%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #2198f2;
}
.chooseBtn text:last-child {
	float: right;
	background-color: #007aff;
}
.checked {
	color: #007aff !important;
	/* background: #007aff; */
}
.checkeds {
	color: #007aff !important;
	/* background: #007aff; */
}
</style>
