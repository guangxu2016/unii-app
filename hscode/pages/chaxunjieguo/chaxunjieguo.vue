<template>
	<view>
		 <!-- 商品描述 用户选择hscode -->
		<view v-show="userShow" class="ueser_show">
			<view>{{ i18n.chooseChaXun }}</view>
			<view :class="{ checked: isCheck == index }" @click="userChooseClick(ins, index)" v-for="(ins, index) in userChoose" :key="index">
				<text>{{ ins }}</text>
			</view>
			<view>
				<text @click="chaxun">{{ i18n.search }}</text>
			</view>
		</view>
		<!-- true显示数据  默认为true -->

		<view v-show="flag" >
			<view class="yeah_search" >
				<!-- <view class="header_search">
					<view>{{ bianma }}</view>
					<view>{{code}}</view>
				</view>

				<view class="header_search">
					<view>{{ zhongwen }}</view>
					<view>{{zh}}</view>
				</view>

				<view class="header_search">
					<view>{{ yingwen }}</view>
					<view>{{en}}</view>
				</view>
				<view class="header_search">
					<view>{{ shuilv }}</view>
					<view>{{title}}</view>
				</view>
				<view class="header_search">
					<view>{{ specshuilv }}</view>
					<view>{{specliy}}</view>
				</view>
			</view> -->
			<view class="changeHead">
				<text>{{city_ones}}</text>
				<image @click="countryChange" :src="imgsjt" mode=""></image>
				<text>{{city_twes}}</text>
			</view>
			
				<view class="header_search" v-for="(ite,index) in attrList" :key="index" v-if="ite.value != ''">
					<!-- <view>{{ i18n.shangPinBianMa }}</view> -->
						<view v-if="system_info == 'zh_CN'">{{ ite.cn_name }}</view>
						<view v-else>{{ ite.en_name }}</view>
						<view >{{ ite.value}}</view>
					
				</view>
			
			</view>
			
		</view>

		<!-- <view v-if="flag">
			<view class="yeah_search" v-for="item in conCom">
				<view class="header_search">
					<view>{{ i18n.shangPinBianMa }}</view>
					<view>{{ item.hs_code }}</view>
				</view>
				<view class="header_search">
					<view>{{ i18n.zhongWenMiaoShu }}</view>
					<view>{{ item.local_description }}</view>
				</view>

				<view class="header_search">
					<view>{{ i18n.yingWenMiaoShu }}</view>
					<view>{{ item.international_description }}</view>
				</view>
				<view class="header_search">
					<view>{{ i18n.zengZhiSui }}</view>
					<view>{{ item.general_rate_of_duty || 0 }}</view>
				</view>
			</view>
		</view> -->

		<view class="not_search" v-show="hide">
			<!-- <image src="../../static/image/fdj.png" mode=""></image> -->
			<image src="../../static/image/search.png" mode=""></image>
			<view>{{ i18n.notSearch }}~</view>
			<view @click="back">{{ i18n.back }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag: false,
			hide:false,
			city_one_name: '',
			city_one_index: '',
			city_two_name: '',
			city_two_index: '',
			search: '',
			num: '',
			local_langu: '',
			inter_langu: '',
			exit: '',
			generally: '',
			conCom: [],
			userShow: false,
			userChoose: [],
			isCheck: -1,
			result: '',
			code:"",
			en:"",
			zh:"",
			title:"",
			specliy:"",
			bianma:"",
			zhongwen:"",
			yingwen:"",
			shuilv:"",
			specshuilv:"",
			nums:0,
			types:"",
			attrList:[],
			system_info:"",
			status:1,
			imgsjt:"../../static/image/change.png",
			city_twes:"",
			city_ones:"",
			edqa:""
		};
	},
	onLoad: function(option) {
		uni.setNavigationBarTitle({
				title: this.$t('index.chaxunjieguo')
		})	
		console.log(option.city_one_name);
		console.log(option.city_one_index);
		console.log(option.city_two_name);
		console.log(option.city_two_index);
		console.log(option.search);
		console.log(option.two_search);

		this.city_one_name = option.city_one_name;
		this.city_one_index = option.city_one_index;
		this.city_two_name = option.city_two_name;
		this.city_two_index = option.city_two_index;
		this.search = option.search;
		this.two_search = option.two_search;
		this.types = option.type
		let type = option.type;
		const system_info = uni.getStorageSync('system_info');
		console.log(system_info.language);
		this.system_info = system_info.language;
		console.log('type类型是' + type);
		var that = this;
		// 已知hscode查询
		if (type == 'KnowHScode') {
			// if(this.status == 1){
				that.aaa();
			// }
			
		} else if (type == 'zhuanyi') {
			// 转译接口
			this.userShow = false;
			uni.request({
				url: 'http://td.gfapki.com.cn:8090/machine-interface-cch',
				method: 'get',
				data: {
					countryIndex1: this.city_one_index,
					countryIndex2: this.city_two_index,
					knownHsCodeForCountry1: this.search,
					maxNumberOfResults: '10'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					console.log(res.data);
	
						if (res.data == '' || res.data == null ||res.data == undefined) {
							this.userShow = false;
							this.flag = false;
							this.hide = true;
						} else {
							this.userShow = true;
							this.userChoose = res.data;
						}
				},
				fail: () => {},
				complete: () => {}
			});
		} else {
			// 查询商品描述接口
// http://td.gfapki.com.cn:8090/machine-interface-cd?countryIndex=I & description=D&maxNumberOfResults=M
			uni.request({
				// url: 'http://td.gfapki.com.cn:8090/machine-interface-ccd',
				url:"http://td.gfapki.com.cn:8090/machine-interface-cd",
				method: 'get',
				data: {
					countryIndex: this.city_one_index,
					description: this.search,
					maxNumberOfResults: '10'
				},
				// data: {
				// 	countryIndex1: this.city_one_index,
				// 	countryIndex2: this.city_two_index,
				// 	description: this.search,
				// 	maxNumberOfResults: '10'
				// },
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					console.log(res.data);
					// this.imgsjt = "";
					if(res.data == null || res.data == undefined || res.data == ""){
						this.flag = false;
						this.hide = true;
						return false;
					}
					for (var i = 0; i < res.data.length; i++) {
						if(res.data[i] == "" || res.data[i] == null){
							that.flag = false;
							that.hide = true;
							return false;
						}
						
					}
			
						this.userShow = true;
						this.userChoose = res.data;
					
					// if (res.data.hs_codes_for_country_1 == '') {
					// 	this.userShow = false;
					// 	this.flag = false;
					// 	this.hide = true;
					// } else {
					// 	this.userShow = true;
					// 	this.userChoose = res.data.hs_codes_for_country_1;
					// }
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	methods: {
		 aaa(){
			 var that = this;
			that.userShow = false;
			that.baseUrl = that.websiteUrl;
			let token = uni.getStorageSync('storage_token');
			uni.request({
				url: that.baseUrl + '/api/search',
				method: 'GET',
				data: {
					hscode1: that.search,
					country_index1: that.city_one_index,
					country_name1: that.city_one_name,
					country_index2: that.city_two_index,
					country_name2: that.city_two_name,
					type: '1',
					hscode2: that.two_search
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: res => {
					console.log(res.data);
					// console.log(res.data.data[0]);
					
					if(res.data.code == "200") {
						
					if(res.data.data[0] == null || res.data.data[0] == undefined || res.data.data[0] == "") {
						that.flag = false;
						that.hide = true;
						return false;
					}else {
						that.flag = true;
						that.hide = false;
					}
						console.log(res.data.data[0].data)
						
						if(that.status == 1){
							that.attrList = res.data.data[0].data;
						that.city_ones = that.city_two_name;
						that.city_twes = that.city_one_name;
						}else if(that.status == 2){
							that.attrList = res.data.data[1].data;
							that.city_ones = that.city_one_name;
							that.city_twes = that.city_two_name;
						}else {
							if(res.data.data[1] == null || res.data.data[1] == undefined || res.data.data[1] == "") {
								uni.showToast({
								    title: "请返回页面，查看是否填写正确",
									icon:"none",
									duration: 2000
								});
								return false;
							}
							that.attrList = res.data.data[1].data;
							
						}
						
					}else if(res.data.code == "202") {
						that.flag = false;
						that.hide = true;
						uni.showToast({
						    title: res.data.msg,
							icon:"none",
							duration: 2500
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		back() {
			uni.navigateBack();
		},
		countryChange(){
			if(this.types == "KnowHScode" ){
				if(this.status == 1) {
					this.status = 2;
					// 切换后数据
					console.log("2是切换了第一下"+this.status);
					this.aaa();
					this.city_ones = this.city_two_name;
					this.city_twes = this.city_one_name;
					
				}else {
					// 原来的
					this.status = 1;
					this.aaa();
					this.city_ones = this.city_one_name;
					this.city_twes = this.city_two_name;
					
				}
			}
		},
		userChooseClick(e, index) {
			console.log(e);
			this.isCheck = index;
			this.result = e;
			this.nums = 1;
		},
		chaxun() {
			if(this.nums == "0") {
				uni.showToast({
				    title: "请选择",
					icon:"none",
					duration: 800
				});
				return false;
			}
			if(this.types == "miaoshu") {
				console.log(this.result);
				var that = this;
				this.userShow = false;
				this.baseUrl = this.websiteUrl;
				const system_info = uni.getStorageSync('system_info');
				let token = uni.getStorageSync('storage_token');
				uni.request({
					url: this.baseUrl + '/api/search',
					method: 'GET',
					data: {
						hscode1: this.result,
						country_index1: this.city_one_index,
						country_name1: this.city_one_name,
						country_index2: this.city_two_index,
						country_name2: this.city_two_name,
						type: '2',
						content: this.search
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						token: token
					},
					success: res => {
						console.log(res.data);
						console.log(res.data.data);
						
					if(res.data.code == "200") {
						console.log("111111")
					
						if(res.data.data == null || res.data.data == undefined || res.data.data == "") {
							this.flag = false;
							this.hide = true;
							return false;
						}else {
							this.flag = true;
							this.hide = false;
						}
							// console.log("商品编码"+res.data.data.data[0].value);
							// console.log("中文描述"+res.data.data.data[1].value);
							// console.log("普通税率"+res.data.data.data[3].value);
							// console.log("特殊税率"+res.data.data.data[4].value);
							// this.code = res.data.data.data[0].value;
							// this.en = res.data.data.data[1].value;
							// this.zh = res.data.data.data[1].value;
							// this.title = res.data.data.data[3].value || 0;
							// this.specliy = res.data.data.data[4].value || 0;
							console.log(res.data.data.data)
							this.attrList = res.data.data.data;
							
							that.city_twes = that.city_two_name;
							that.city_ones = that.city_one_name;
							
							console.log(this.attrList);
							// if(system_info.language == "zh_CN") {
							// 	this.bianma = res.data.data.data[0].cn_name;
							// 	this.zhongwen = res.data.data.data[1].cn_name;
							// 	this.yingwen = res.data.data.data[1].en_name;
							// 	this.shuilv = res.data.data.data[3].cn_name;
							// 	this.specshuilv = res.data.data.data[4].cn_name;
							// }else if(system_info.language == "en") {
							// 	this.bianma = res.data.data.data[0].en_name || 0;
							// 	this.zhongwen = res.data.data.data[1].cn_name;
							// 	this.yingwen = res.data.data.data[1].en_name;
							// 	this.shuilv = res.data.data.data[3].en_name;
							// 	this.specshuilv = res.data.data.data[4].en_name;
							// }
							
						}else if(res.data.code == "202") {
							this.flag = false;
							this.hide = true;
							uni.showToast({
							    title: res.data.msg,
								icon:"none",
								duration: 2500
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}else if(this.types == "zhuanyi") {
				console.log(this.result);
				this.userShow = false;
				this.baseUrl = this.websiteUrl;
				const system_info = uni.getStorageSync('system_info');
				let token = uni.getStorageSync('storage_token');
				uni.request({
					url: this.baseUrl + '/api/search',
					method: 'GET',
					data: {
						hscode1: this.search,
						country_index1: this.city_one_index,
						country_name1: this.city_one_name,
						country_index2: this.city_two_index,
						country_name2: this.city_two_name,
						type: '3',
						hscode2:this.result
						// hscode2: this.result
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						token: token
					},
					success: res => {
						console.log(res.data);
						console.log(res.data.data);
						
						if(res.data.data == null || res.data.data == "" || res.data.data == undefined) {
							this.hide = true;
							this.flag = false;
							
						}
						
					if(res.data.code == "200") {
						if(res.data.data == null || res.data.data == undefined || res.data.data == "") {
							this.flag = false;
							this.hide = true;
							return false;
						}else {
							this.flag = true;
							this.hide = false;
						}
							// console.log("商品编码"+res.data.data.data[0].value);
							// console.log("中文描述"+res.data.data.data[1].value);
							// console.log("普通税率"+res.data.data.data[3].value);
							// console.log("特殊税率"+res.data.data.data[4].value);
							// this.code = res.data.data.data[0].value;
							// this.en = res.data.data.data[1].value;
							// this.zh = res.data.data.data[1].value;
							// this.title = res.data.data.data[3].value || 0;
							// this.specliy = res.data.data.data[4].value || 0;
							console.log(res.data.data.data)
							this.attrList = res.data.data.data;
							console.log(this.city_two_name);
							this.city_twes = this.city_two_name;
							this.city_ones = this.city_one_name;
							console.log(this.attrList);
							// if(system_info.language == "zh_CN") {
							// 	this.bianma = res.data.data.data[0].cn_name;
							// 	this.zhongwen = res.data.data.data[1].cn_name;
							// 	this.yingwen = res.data.data.data[1].en_name;
							// 	this.shuilv = res.data.data.data[3].cn_name;
							// 	this.specshuilv = res.data.data.data[4].cn_name;
							// }else if(system_info.language == "en") {
							// 	this.bianma = res.data.data.data[0].en_name || 0;
							// 	this.zhongwen = res.data.data.data[1].cn_name;
							// 	this.yingwen = res.data.data.data[1].en_name;
							// 	this.shuilv = res.data.data.data[3].en_name;
							// 	this.specshuilv = res.data.data.data[4].en_name;
							// }
							
						}else if(res.data.code == "202") {
							this.flag = false;
							this.hide = true;
							uni.showToast({
							    title: res.data.msg,
								icon:"none",
								duration: 2500
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
};
</script>

<style>
page {
	/* background-color: #f1f1f1; */
}
.not_search {
	position: relative;
	top: 300rpx;
	text-align: center;
	/* background-color: #fff; */
}
.not_search image {
	width: 260rpx;
	height: 200rpx;
}
.not_search view:nth-child(2) {
	color: #bbb;
	font-size: 32rpx;
	margin-top: 20rpx;
}
.not_search view:last-child {
	width: 70%;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	border-radius: 40rpx;
	color: #fff;
	background-color: #007AFF;
	margin: 0 auto;
	margin-top: 50rpx;
}
.yeah_search {
	width: 92%;
	margin: 0 auto;
	/* border-top:1px solid #ccc; */
	padding: 40rpx 30rpx;
	padding-bottom: 50rpx;
	background-color: #fff;
	-moz-box-shadow: 0px 0px 2px 3px #dfdfdf;
	-webkit-box-shadow: 0px 0px 2px 3px #dfdfdf;
	box-shadow: 0px 0px 2px 3px #dfdfdf;
	border-radius: 20rpx;
	margin-top: 30rpx;
	margin-bottom: 60rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.yeah_search .header_search {
	border-bottom: 1px solid #ccc;
	padding-bottom: 10rpx;
	box-sizing: border-box;
}
.header_search + .header_search {
	margin-top: 20rpx;
}
.yeah_search .header_search view {
	font-size: 28rpx;
	line-height: 40rpx;
}
.yeah_search .header_search view:first-child {
	/* color: #111; */
	font-weight: bold;
}
.yeah_search .header_search view:last-child {
	margin-top: 10rpx;
}
.ueser_show {
	width: 80%;
	margin: 0 auto;
	padding: 30rpx 20rpx;
	border-radius: 20rpx;
	margin-top: 40rpx;
	-moz-box-shadow: 0px 0px 2px 3px #ccc;
	-webkit-box-shadow: 0px 0px 2px 3px #ccc;
	box-shadow: 0px 0px 2px 3px #ccc;
	overflow: hidden;
	box-sizing: border-box;
}
.ueser_show view {
	font-size: 36rpx;
	line-height: 50rpx;
}
.ueser_show view text {
	display: block;
}

.ueser_show view:last-child text {
	width: 200rpx;
	height: 60rpx;
	line-height: 60rpx;
	background-color: #007aff;
	color: #fff;
	text-align: center;
	border-radius: 20rpx;
	font-size: 34rpx;
	margin: 0 auto;
}
.checked {
	color: red;
	/* background: red; */
}

.changeHead {
	width: 100%;
	text-align: center;
	margin: 0 auto;
}
.changeHead text {
	font-size: 32rpx;
}

.changeHead image {
	width: 60rpx;
	height: 50rpx;
	margin: 0rpx 20rpx;
	vertical-align: middle;
}


</style>
