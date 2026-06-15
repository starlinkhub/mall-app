<template>
	<view class="container">
		<!-- 头部选择位置 -->
		<view class="header">
			<view class="header-address">
				<view class="header-address-left">
					<image src="/static/icon/address.svg"></image>
					<text>{{address}}</text>
					<image class="header-address-down-icon" src="/static/icon/down.svg"></image>
				</view>
				<view class="header-address-right">
					<image class="header-address-scan-icon" src="/static/icon/scan.svg"></image>
					<image src="/static/icon/message.svg"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="middle">
				<!-- 搜索栏 -->
				<view class="search" @click="search()">
					<image src="/static/icon/search.svg"></image>
					<view class="search-input">
						<input type="text" placeholder="吃出美好生活" />
					</view>
				</view>
				<!-- 轮播图 -->
				<view class="banner">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
						:interval="interval" :duration="duration">
						<swiper-item v-for="item in banner" :key="item.id">
							<image :src="item.image"></image>
						</swiper-item>
					</swiper>
				</view>
				<!-- 商品分类 -->
				<view class="category">
					<view v-for="(item, index) in category" :key="item.id" class="category-item">
						<view class="category-item-info" @click="goCategory(item.id)">
							<image :src="item.image"></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="part1">
					<view class="part1-top">
						<view class="part1-left">
							<text class="part1-left-huasuan">超划算</text>
							<text class="part1-left-dongri">冬日礼遇</text>
						</view>
						<view class="part1-right">
							<text>查看全部</text>
						</view>
					</view>
					<view class="part1-bottom">
						<view class="part1-content" v-for="(item, index) in part1" :key="item.id">
							<view class="part1-content-top" @click="goodsDetail()">
								<image class="part1-goods-img" :src="item.image"></image>
							</view>
							<text class="part1-goods-name">{{item.name}}</text>
							<view class="part1-content-bottom">
								<text class="part1-goods-price">￥{{item.price}}</text>
								<image class="part1-shopcar-icon" src="/static/icon/shopcar.svg"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="part2">
					<view class="part2-left">
						<view class="part2-txt">
							<text class="part2-title">吃好点</text>
							<text class="part2-description">中国小木瓜尝鲜</text>
						</view>
						<view class="part2-img">
							<image src="/static/image/goods/4.png"></image>
							<image src="/static/image/goods/5.png"></image>
						</view>
					</view>
					<view class="part2-right">
						<view class="part2-txt">
							<text class="part2-title">产地量贩</text>
							<text class="part2-description">核桃19.9元/箱</text>
						</view>
						<view class="part2-img">
							<image src="/static/image/goods/6.png"></image>
							<image src="/static/image/goods/7.png"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="bottom">
				<view class="goods">
					<view class="goods-item" v-for="(item, index) in list" :key="item.id">
						<image class="goods-item-image" :src="item.image"></image>
						<view class="goods-item-name">
							{{item.name}}
						</view>
						<view class="goods-item-tag">
							<text v-for="(i, index) in item.service" :key="index">
								{{i}}
							</text>
						</view>
						<view class="goods-item-price">
							<text class="goods-item-price-txt">￥{{item.price}}<text class="goods-item-price-unit">
									/{{item.unit}}</text></text>
							<image class="goods-item-shopcar-icon" src="/static/icon/shopcar.svg"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: '海淀区中关村大厦',
				indicatorDots: true, //是否显示面板指示点
				autoplay: true, //是否自动切换
				interval: 10000, //自动切换时间间隔
				duration: 500, //自动切换时间间隔
				banner: [{
						id: 1,
						image: "/static/image/banner/1.png"
					},
					{
						id: 2,
						image: "/static/image/banner/1.png"
					},
				],
				category: [{
						id: 1,
						name: "水果蔬菜",
						image: "/static/image/category/1.png",
					},
					{
						id: 2,
						name: "肉禽蛋品",
						image: "/static/image/category/2.png",
					},
					{
						id: 3,
						name: "海鲜水产",
						image: "/static/image/category/3.png",
					},
					{
						id: 4,
						name: "速食冷冻",
						image: "/static/image/category/4.png",
					},
					{
						id: 5,
						name: "粮油米面",
						image: "/static/image/category/5.png",
					},
				],
				part1: [{
						id: 1,
						name: "四川爱媛38号…",
						image: "/static/image/goods/1.png",
						price: "39.9"
					},
					{
						id: 2,
						name: "山养黄牛腱子肉",
						image: "/static/image/goods/2.png",
						price: "39.9"
					},
					{
						id: 3,
						name: "有机水果卷心菜",
						image: "/static/image/goods/3.png",
						price: "38.8"
					},
				],
				loadStatus: 'loadmore',
				flowList: [],
				list: [{
						id: 1,
						name: '彩食鲜菠菜 270g/份',
						price: '19.9',
						unit: '份',
						image: '/static/image/goods/8.png',
						service: ["特价", "24H发货"]
					},
					{
						id: 2,
						name: '四川爱媛38号可吸果冻橙 1kg/份',
						price: '39.9',
						unit: '箱',
						image: '/static/image/goods/9.png',
						service: ["特价", "24H发货"]
					},
					{
						id: 3,
						name: '云南昆明 有机水果胡萝卜 1.5kg/份',
						price: '38.8',
						unit: '箱',
						image: '/static/image/goods/10.png',
						service: ["特价", "24H发货"]
					},
					{
						id: 4,
						name: '云南香格里拉 野生山核桃 原味150g*',
						price: '39.9',
						unit: '箱',
						image: '/static/image/goods/11.png',
						service: ["特价", "24H发货"]
					},
					{
						id: 5,
						name: '彩食鲜菠菜 270g/份',
						price: '12.8',
						unit: '份',
						image: '/static/image/goods/12.png',
						service: ["特价", "24H发货"]
					},
				]
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			// 跳转搜索页面
			search() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			},
			addRandomData() {
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
				}
			},
			goodsDetail() {
				uni.navigateTo({
					url: '/pages/goods/goods'
				})
			},
			goCategory(id) {
				this.$utils.setStorage('category_tab_id', id)
				uni.switchTab({
					url: '/pages/category/category'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F8F9FA;
	}
</style>

<style lang="scss" scoped>
	.content {
		padding: 40rpx;
	}

	.header {
		padding: 30rpx 40rpx;
		background-color: #40AE36;

		.header-address {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.header-address-left {
				display: flex;
				align-items: center;

				.header-address-down-icon {
					width: 16rpx;
					height: 10rpx;
					margin-left: 10rpx;
				}

				image {
					width: 48rpx;
					height: 48rpx;
				}

				text {
					font-size: 30rpx;
					color: #FFFFFF;
					margin-left: 6rpx;
				}
			}

			.header-address-right {
				display: flex;
				align-items: center;

				.header-address-scan-icon {
					margin-right: 20rpx;
				}

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}

	.search {
		background: #EDEFF2;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		padding: 14rpx 36rpx;

		.search-input {
			margin-left: 20rpx;

			input {
				color: #999999;
				font-size: 28rpx;
			}
		}

		image {
			width: 32rpx;
			height: 32rpx;
		}
	}

	.banner {
		margin-top: 24rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}

		.swiper {
			height: 300rpx;
		}

		.swiper-item {
			display: block;
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;
		}

		.swiper-list {
			margin-top: 40rpx;
			margin-bottom: 0;
		}

		.uni-common-mt {
			margin-top: 60rpx;
			position: relative;
		}

		.info {
			position: absolute;
			right: 20rpx;
		}

		.uni-padding-wrap {
			width: 550rpx;
			padding: 0 100rpx;
		}
	}

	.category {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;

		.category-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 20%;
			margin-bottom: 20rpx;
		}

		.category-item-info {
			display: flex;
			flex-direction: column;
		}

		image {
			width: 108rpx;
			height: 108rpx;
		}

		text {
			font-size: 24rpx;
			color: #666666;
			margin-top: 16rpx;
		}
	}

	.part1 {
		border-radius: 20rpx;
		background: #FFFFFF;
		margin-top: 40rpx;
		padding: 20rpx 30rpx 30rpx 30rpx;

		.part1-top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.part1-left {
				display: flex;
				align-items: center;

				.part1-left-huasuan {
					font-size: 34rpx;
					color: #333333;
					font-weight: bold;
				}

				.part1-left-dongri {
					font-size: 18rpx;
					color: #FFFFFF;
					background: #EC9F09;
					border-radius: 4rpx;
					padding: 0rpx 4rpx;
					margin-left: 10rpx;
				}
			}

			.part1-right {
				font-size: 24rpx;
				color: #40AE36;
			}
		}

		.part1-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.part1-goods-img {
				width: 180rpx;
				height: 180rpx;
			}

			.part1-content-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
			}

			.part1-goods-name {
				color: #666666;
				font-size: 24rpx;
				padding: 10rpx 0rpx;
			}

			.part1-goods-price {
				color: #F55726;
				font-size: 32rpx;
				font-weight: 600;
			}
		}

		.part1-shopcar-icon {
			width: 44rpx;
			height: 44rpx;
			margin-right: 10rpx;
		}
	}

	.part2 {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.part2-left {
			border-radius: 20rpx;
			background: #FFFFFF;
			margin-top: 40rpx;
			padding: 20rpx 30rpx 10rpx 30rpx;
		}

		.part2-right {
			border-radius: 20rpx;
			background: #FFFFFF;
			margin-top: 40rpx;
			padding: 20rpx 30rpx 10rpx 30rpx;
		}

		.part2-txt {
			display: flex;
			flex-direction: column;
		}

		.part2-title {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
		}

		.part2-description {
			font-size: 24rpx;
			color: #999999;
			margin-top: 4rpx;
		}

		.part2-img {
			margin-top: 16rpx;

			image {
				width: 130rpx;
				height: 130rpx;
			}
		}
	}

	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-radius: 20rpx;
			background: #FFFFFF;
			padding: 0rpx 20rpx 30rpx 20rpx;
			margin-top: 30rpx;
		}

		.goods-item-image {
			width: 280rpx;
			height: 280rpx;
			border-radius: 4px;
		}

		.goods-item-name {
			width: 274rpx;
			font-size: 26rpx;
			font-weight: 700;
			line-height: 34rpx;
			color: #333333;
			margin-top: 10rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.goods-item-tag {
			display: flex;
			align-items: center;
			margin-top: 14rpx;
			font-size: 18rpx;

			text:nth-child(1) {
				color: #F55726;
				border: 1px solid #F55726;
				border-radius: 4rpx;
				padding: 0rpx 4rpx;
			}

			text:nth-child(2) {
				color: #40AE36;
				border: 1px solid #40AE36;
				border-radius: 4rpx;
				margin-left: 10rpx;
				padding: 0rpx 4rpx;
			}
		}

		.goods-item-price {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 14rpx;

			.goods-item-price-txt {
				color: #F55726;
				font-size: 32rpx;
				font-weight: 600;

				.goods-item-price-unit {
					font-size: 22rpx;
					color: #999999;
					font-weight: normal;
				}
			}

			.goods-item-shopcar-icon {
				width: 44rpx;
				height: 44rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>