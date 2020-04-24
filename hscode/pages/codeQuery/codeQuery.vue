<template>
	<view class="content">
		<view class="banner"><image src="../../static/image/banner2.png" mode=""></image></view>
		<view class="content_box">
			<view class="choose">
				<view @click="first" class="picker" v-if="city_one == ''">{{ i18n.pleaseChoose }}</view>
				<view @click="first" class="picker" v-else>{{ city_one }}</view>
				<image src="../../static/image/change.png"></image>
				<view class="picker" @click="second" v-if="city_two == ''">{{ i18n.pleaseChooseCross }}</view>
				<view class="picker" @click="second" v-else>{{ city_two }}</view>
			</view>
			<view class="entry">
				<view><input v-model="search" :valueww="search" @input="messagesearch" type="text" :placeholder="i18n.pleaseHScode" /></view>
				<view><input v-model="searchs" :valueww="searchs" @input="messagesearchs" type="text" :placeholder="i18n.pleaseHScode" /></view>
			</view>
			<view class="search" @click="searchClick">{{ i18n.search }}</view>
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
		<!-- <view @click="haha">点击</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			years: [],
			yearss: [],
			search: '',
			searchs: '',
			city_one: '',
			city_num: '',
			city_first: false,
			city_two: '',
			city_nums: '',
			city_second: false,
			isCheck: 0,
			isChecks: 0
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('index.querys')
		});

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
		onKeyUserNameInput: function(event) {
			this.phone = event.target.value;
		},
		//  yearChange:function(e){
		//     console.log(e)
		// 	this.yearsIndex = e.detail.value;
		// },
		// yearChanges:function(e){
		//     console.log(e)
		// 	this.yearsIndexs = e.detail.value;
		// },
		messagesearch: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.search = event.target.value;
			uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
			});
		},
		messagesearchs: function(event) {
			// 这里动态获取VALUE 值
			// console.log(event.target.value)
			this.searchs = event.target.value;
			uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
			});
		},

		chooseClick(num, index) {
			console.log(index.value + "国家");
			console.log(index.key + "key");
			console.log(num);
			this.city_one = index.value;
			this.city_num = index.key;
			this.isCheck = index;
		},
		first() {
			this.city_first = true;
		},
		cancelFirst() {
			this.city_first = false;
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
			console.log('第一个国家名' + this.city_one);
			console.log('第一个国家索引' + this.city_num);
			console.log('第二个国家名' + this.city_two);
			console.log('第二个国家索引' + this.city_nums);
			console.log(this.search);
			console.log(this.searchs);
			let city_one = this.city_one;
			let city_two = this.city_two;
			let one_index = this.city_num;
			let two_index = this.city_nums;
			let token = uni.getStorageSync('storage_token');
			console.log(token);
			if (token == '') {
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
					title: '第一个HScode不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.searchs == '' || this.searchs == undefined || this.searchs == null) {
				uni.showToast({
					title: '第二个HScode不能为空',
					icon: 'none',
					duration: 800
				});
				return false;
			}

			//  接口传参	 type=KnowHScode 已知hscode查询
			uni.navigateTo({
				url:
					'../chaxunjieguo/chaxunjieguo?type=KnowHScode&city_one_name=' +
					city_one +
					'&city_one_index=' +
					one_index +
					'&city_two_name=' +
					city_two +
					'&city_two_index=' +
					two_index +
					'&search=' +
					this.search +
					'&two_search=' +
					this.searchs
			});
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
	margin-bottom: 50rpx;
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
	margin-top: 60rpx;
}
.entry view input {
	border: none;
	outline: none;
	height: 90rpx;
	line-height: 90rpx;
	font-size: 32rpx;
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
	/* background-color: #2198F2; */
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
