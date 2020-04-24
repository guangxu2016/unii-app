<template>
	<view>
		<!-- <view>
		        <web-view :webview-styles="webviewStyles" src="https://www.teggs.net/"></web-view>
		    </view> -->
		<view class="header">
			<view>
				<image src="../../static/image/teg.png"></image>
				<text @click="sign">{{i18n.joinHomePage}}</text>
			</view>
		</view>
		<view class="choose_country">
			<text>{{i18n.kuaJingFuWu}}</text>
			<view>
				<text>{{ i18n.out }}</text>
				<text @click="first" class="picker" v-if="city_one == ''">
					<!-- {{ city_one }} -->
					{{i18n.pleaseChoose}}
				</text> 
				<text @click="first" class="picker" v-else>
					{{ city_one }}
					<!-- {{i18n.pleaseChoose}} -->
				</text> 
				<input v-model="local" :valueww="local" @input="localsearch" type="text" :placeholder="i18n.pleaseAircraft" />
			</view>
			<view>
				<text>{{ i18n.objective }}</text>
				 <text class="picker" @click="second" v-if="city_two == ''">
					{{ i18n.pleaseChooseCross }}
				 </text> 
				 <text class="picker" @click="second"  v-else>
				 	{{ city_two }}
				 </text> 
				<input v-model="inter" :valueww="inter" @input="intersearch" type="text" :placeholder="i18n.pleaseAircraft" />
			</view>
		</view>
		<view class="cross_shop haha">
			<view>
				<text>{{i18n.maozhong}}</text>
				<input v-model="maozhong" :valueww="maozhong" @input="messagesearch" type="text" :placeholder="i18n.pleaseMaoZhong" />
			</view>
			<view>
				<text>{{i18n.tiji}}</text>
				<input v-model="tiji" :valueww="tiji" @input="tijisearch" type="text" :placeholder="i18n.pleaseTiJi" />
			</view>
			<text class="phone">{{i18n.pleaseContact}}</text>
		</view>

		<view class="cross_shop people">
			<view>
				<text>{{i18n.name}}</text>
				<input v-model="name" :valueww="name" @input="namesearch" type="text" :placeholder="i18n.pleaseName" />
			</view>
			<view>
				<text>{{i18n.phone}}</text>
				<input v-model="phone" :valueww="phone" @input="phonesearch" type="text" :placeholder="i18n.pleasePhone" />
			</view>
		</view>

		<view class="hhhhh" v-show="city_first">
			<view class="chooseBtn">
				<text @click="cancelFirst">取消</text>
				<text @click="sureFirst">确认</text>
			</view>
			<view class="box">
				<view v-for="(index, itemq) in years">
					<text :class="{ checkeds: isChecks == index }" @click="chooseClick(itemq, index)">{{ index.value }}</text>
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
					<text :class="{ checked: isCheck == index }" @click="chooseClicks(itemq, index)">{{ index.value }}</text>
				</view>
			</view>
		</view>
		<view class="mark" v-show="mark">
			<view>请联系相关负责人员</view>
			<view>
				<text>联系人:</text>
				<text>{{lianxiren}}</text>
			</view>
			<view>
				<text>手机号:</text>
				<text>{{lianxirentel}}</text>
			</view>
			<view @click="markBtn">确认</view>
		</view>
		<div class="hide" v-show="mark"></div>
		<view class="submit"><view @click="submit">{{i18n.submit}}</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			years: [],
			// yearsIndex:0,
			yearss: [],
			city_one: '',
			city_num: '',
			city_first: false,
			city_two: '',
			city_nums: '',
			city_second: false,
			maozhong: '',
			tiji: '',
			name: '',
			phone: '',
			local: '',
			inter: '',
			baseUrl: '',
			isCheck: 0,
			isChecks: 0,
			mark:false,
			hide:false,
			lianxiren:"",
			lianxirentel:""
		};
	},
	onLoad() {
		uni.request({
			url: 'http://td.gfapki.com.cn:8090/country-indices',
			method: 'GET',
			// data: {
			// },
			success: res => {
				console.log(eval(res.data));
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
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('index.navTitleTwo')
		})
		uni.setTabBarItem({
			index:0,
		    text: this.i18n.navTitle
		});
		uni.setTabBarItem({
			index:1,
		    text: this.i18n.navTitleTwo
		});
		uni.setTabBarItem({
			index:2,
		    text: this.i18n.navTitleThree
		});
		uni.setTabBarItem({
			index:3,
		    text: this.i18n.navTitleFour
		});
		// console.log('now:' + this.websiteUrl);
		this.baseUrl = this.websiteUrl;
		let token = uni.getStorageSync('storage_token');
		// console.log(this.baseUrl);
			// 联系人方式
			uni.request({
				url: this.baseUrl + "/api/getContacts",
				method: 'GET',
				// data: {
				// },
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					console.log(res.data);
					this.lianxiren = res.data.data.mobile;
					this.lianxirentel = res.data.data.person_in_charge;
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
		sign() {
			uni.navigateTo({
				url: '../teggs/teggs'
			});
		},
		chooseClick(num, index) {
			console.log(index.value);
			console.log(index.key);
			console.log(num);
			this.city_one = index.value;
			this.city_num = index.key;
			this.isChecks = index;
		},
		first() {
			this.city_first = true;
		},
		cancelFirst() {
			this.city_first = false;
			// let as = this.city_one;
			// this.city_one = "请选择";
		},
		sureFirst() {
			this.city_first = false;
			this.city_one = this.city_one;
		},
		chooseClicks(num, index) {
			console.log(index.value);
			console.log(index.key);
			this.city_two = index.value;
			this.city_nums = index.key;
			this.isCheck = index;
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
		messagesearch: function(event) {
			this.maozhong = event.target.value;
		},
		tijisearch: function(event) {
			this.tiji = event.target.value;
		},
		namesearch: function(event) {
			this.name = event.target.value;
		},
		phonesearch: function(event) {
			this.phone = event.target.value;
		},
		localsearch: function(event) {
			this.local = event.target.value;
		},
		intersearch: function(event) {
			this.inter = event.target.value;
		},
		submit() {
		
			console.log('第一个国家名' + this.city_one);
			console.log('第一个国家索引' + this.city_num);
			console.log('第二个国家名' + this.city_two);
			console.log('第二个国家索引' + this.city_nums);
			console.log('毛重' + this.maozhong);
			console.log('体积' + this.tiji);
			console.log('姓名' + this.name);
			console.log('手机号' + this.phone);
			console.log('出发地' + this.local);
			console.log('目的地' + this.inter);
			let token = uni.getStorageSync('storage_token');
			let city_one = this.city_one;
			
			var that = this;
			
			console.log(token);
			if(token == "") {
				uni.showToast({
					title: '请登录后提交',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			if (city_one == '') {
				uni.showToast({
					title: '请选择出发地',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.local == '' || this.local == null || this.local == undefined) {
				uni.showToast({
					title: '请输入港口/机场',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.city_two == '') {
				uni.showToast({
					title: '请选择目的地',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.inter == '' || this.inter == null || this.inter == undefined) {
				uni.showToast({
					title: '请输入港口/机场',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.maozhong == '' || this.maozhong == null || this.maozhong == undefined) {
				uni.showToast({
					title: '请输入毛重',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.tiji == '' || this.tiji == null || this.tiji == undefined) {
				uni.showToast({
					title: '请输入体积',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.name == '' || this.name == null || this.name == undefined) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (this.phone == '' || this.phone == null || this.phone == undefined) {
				uni.showToast({
					title: '请输入电话',
					icon: 'none',
					duration: 800
				});
				return false;
			} else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none',
					duration: 800
				});
				return false;
			}
			uni.request({
				url: this.baseUrl + '/api/yitihua',
				method: 'post',
				data: {
					country_name1: this.city_one,
					country_index1: this.city_num,
					airport1: this.local,
					country_name2: this.city_two,
					country_index2: this.city_nums,
					airport2: this.inter,
					weight: this.maozhong,
					volume: this.tiji,
					realname: this.name,
					phone: this.phone
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					console.log(res.data);
					console.log(token);
					if (res.data.code == '200') {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 500
						});
						this.local = '';
						this.inter = '';
						this.maozhong = '';
						this.tiji = '';
						this.name = '';
						this.phone = '';
						
						setTimeout(function(){
							that.mark = true;
							that.hide = true;
							// uni.showModal({
							//     title: '提示',
							//     content: '会员折扣9.8折会员折扣9.8折会员折扣9.8折会员折扣9.8折会员折扣9.8折',
							//     success: function (res) {
							//         if (res.confirm) {
							//             console.log('用户点击确定');
							// 			that.mark = true;
							// 			that.hide = true;
							//         } else if (res.cancel) {
							//             console.log('用户点击取消');
							//         }
							//     }
							// });
						},400)
							
					} else if (res.data.code == '203') {
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
		markBtn() {
			this.mark = false;
			this.hide = false;
		}
	}
};
</script>

<style>
	page{
		/* background-color: #007AFF; */
	}
.header {
	width: 100%;
	padding: 0rpx 5%;
	border-bottom: 1px solid #ccc;
	/* background-color: #007AFF; */
	box-sizing: border-box;
}
.header view {
	overflow: hidden;
}

.header view image {
	float: left;
	width: 160rpx;
	height: 100rpx;
}

.header view text {
	float: right;
	display: inline-block;
	/* background-color: #ee6e2d; */
	/* background-color: #007AFF; */
	 background-color: #2c405a;
	color: #fff;
	font-size: 32rpx;
	border-radius: 20rpx;
	padding: 10rpx 20rpx;
	margin-top: 20rpx;
}
.choose_country {
	/* background-color: #a8c247; */
	/* background-color: #ffae00; */
	/* background-color: #4b5cd7; */
	/* background-color: #007AFF; */
	 /* background-color: #5F9EA0; */
	 background-color: #008B8B;
	padding: 0rpx 5%;
	padding-top: 20rpx;
	/* padding-bottom: 40rpx; */
	overflow: hidden;
	box-sizing: border-box;
}
.choose_country > text {
	text-align: center;
	color: #fff;
	font-size: 32rpx;
	width: 100%;
	display: inline-block;
}
.choose_country view {
	height: 80rpx;
	line-height: 80rpx;
	/* background-color: #e5edc1; */
	background-color: #fff;
	border-radius: 10rpx;
	padding-left: 20rpx;
	margin-top: 40rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.choose_country view text {
	float: left;
	font-size: 28rpx;
	color: #444;
	display: inline-block;
	height: 55rpx;
	line-height: 55rpx;
	margin-top: 15rpx;
}
.choose_country view text:first-child {
	border-right: 1px solid #ccc;
	/* padding-right:20rpx; */
	width: 18%;
	overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
}
.choose_country view text:nth-child(2) {
	margin-left: 2%;
	width: 34%;
}
.choose_country view input {
	float: left;
	font-size: 30rpx;
	color: #555;
	margin-left: 2%;
	height: 80rpx;
	line-height: 80rpx;
	width: 43%;
}

.haha view {
	margin-top: 40rpx;
}
.cross_shop {
	/* background-color: #a8c247; */
	/* background-color: #ffae00; */
	/* background-color: #4b5cd7; */
	/* background-color: #007AFF; */
	background-color: #008B8B;
	padding: 0rpx 5%;
	/* padding-bottom: 40rpx; */
	overflow: hidden;
	box-sizing: border-box;
}
.cross_shop view {
	float: left;
	width: 50%;
	height: 80rpx;
	line-height: 80rpx;
	/* background-color: #e5edc1; */
	background-color: #fff;
	/* border-radius: 10rpx; */
	padding-left: 20rpx;
	/* margin-top: 30rpx; */
	overflow: hidden;
	box-sizing: border-box;
}
.cross_shop view text {
	width: 28%;
	font-size: 30rpx;
	height: 55rpx;
	line-height: 55rpx;
	margin-top: 15rpx;
	border-right: 1px solid #ccc;
	float: left;
	color: #444;
	overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
}
.cross_shop view:first-child {
	border-top-left-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
}

.cross_shop view:nth-child(2) {
	border-top-right-radius: 10rpx;
	border-bottom-right-radius: 10rpx;
}
.cross_shop view input {
	width: 60%;
	height: 80rpx;
	padding-left: 20rpx;
	font-size: 30rpx;
}
.phone {
	/* padding:0rpx 5%; */
	/* background-color: #a8c247; */
	/* background-color: #ffae00; */
	/* background-color: #4b5cd7; */
	/* background-color: #007AFF; */
	/* background-color: #2c405a; */
	color: #fff;
	font-size: 32rpx;
	margin-top: 30rpx;
	display: inline-block;
}

.people {
	padding-bottom: 40rpx;
}

.submit {
	/* background-color: #a8c247; */
	/* background-color: #ffae00; */
	/* background-color: #4b5cd7; */
	background-color: #008B8B;
	/* background-color: #2c405a; */
	padding-bottom: 50rpx;
	overflow: hidden;
	box-sizing: border-box;
}

.submit view {
	font-size: 32rpx;
	color: #007AFF;
	 /* background-color: #007AFF; */
	background-color: #fff;
	border-radius: 10rpx;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	width: 240rpx;
	margin: 0 auto;
	margin-top: 40rpx;
}

.hhhhh {
	position: fixed;
	bottom: 0rpx;
	left: 0%;
	width: 100%;
	z-index: 999;
	background-color: #000;
	opacity: 0.9;
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
	font-size: 36rpx;
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
.checkeds {
	color: #007aff !important
	/* background: #007aff; */
}
.checked {
	color: #007aff !important;
	/* background: #007aff; */
}
.hide {
	position: fixed;
	left: 0%;
	top: 0%;
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.8;
	z-index: 9998;
}
.mark {
	position: fixed;
	top:30%;
	left:50%;
	width:500rpx;
	margin-left:-250rpx;
	height:350rpx;
	background-color: #fff;
	border-radius: 10rpx;
	padding:20rpx;
/* 	    -moz-box-shadow:0px 0px 2px 3px #ccc; 
	        -webkit-box-shadow:0px 0px 2px 3px #ccc;
	         box-shadow:0px 0px 2px 3px #ccc; */
	overflow: hidden;
	box-sizing: border-box;
	z-index: 9999;
}
.mark view {
	color:#444;
	font-size: 32rpx;
}

.mark view:first-child {
	padding-bottom: 20rpx;
	text-align: center;
	border-bottom: 1px solid #ccc;
	font-size: 34rpx;
}

.mark view:nth-child(2),
.mark view:nth-child(3) {
	margin-left: 20rpx;
	margin-top: 20rpx;
}

.mark view:last-child {
	width: 220rpx;
	height: 70rpx;
	line-height: 70rpx;
	text-align: center;
	border-radius: 20rpx;
	background-color: #007aff;
	margin: 0 auto;
	margin-top: 30rpx;
	color: #fff;
}
</style>
