<template>
	<view class="u-wrap">
		<view class="header">
			<view class="search-box" @click="search()">
				<image src="/static/icon/search.svg"></image>
				<view class="search-input">
					<input type="text" placeholder="吃出美好生活" />
				</view>
			</view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item, index) in list" :key="item.id" class="u-tab-item"
					:class="[current==item.id ? 'u-tab-item-active' : '']" :data-current="item.id"
					@tap.stop="swichMenu(item.id)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item, index) in list" :key="item.id">
				<scroll-view scroll-y class="right-box" v-if="current==item.id">
					<view class="page-view" v-if="item.goods.length > 0">
						<view class="class-item">
							<view class="thumb-box" v-for="goods in item.goods" :key="goods.id">
								<view class="goods-left">
									<image :src="goods.image" @click="goodsDetail(goods.id)">
									</image>
								</view>
								<view class="goods-right">
									<view class="goods-name" @click="goodsDetail(goods.id)">
										<text>{{goods.name}}</text>
									</view>
									<view class="goods-type" @click="goodsDetail(goods.id)">
										<text v-for="(i, index) in goods.type" :key="index">
											{{i}} <text decode>{{ensp}}</text>
										</text>
									</view>
									<view class="goods-service" @click="goodsDetail(goods.id)">
										<text v-for="(i, index) in goods.service" :key="index">
											{{i}}
										</text>
									</view>
									<view class="goods-price">
										<text class="goods-price-txt"
											@click="goodsDetail(goods.id)">￥{{goods.price}}<text
												class="goods-price-unit">
												/{{goods.unit}}</text></text>
										<view @click="addCart(goods.id)">
											<image class="goods-shopcar-icon" src="/static/icon/shopcar.svg">
											</image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else style="margin-top: 200rpx;">
						<u-empty></u-empty>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ensp: "&ensp;",
				list: [{
						id: 1,
						name: "水果蔬菜",
						goods: [{
								id: 1,
								name: "四川爱媛38号可吸果冻橙",
								image: "/static/image/goods/9.png",
								price: 19.8,
								unit: "份",
								type: ["有机食品", "水果"],
								service: ["特价", "24H发货"]
							},
							{
								id: 2,
								name: "四川眉山 爱媛38号可吸果冻橙礼盒装12",
								image: "/static/image/goods/15.png",
								price: 19.8,
								unit: "份",
								type: ["有机食品", "水果"],
								service: ["特价", "24H发货"]
							},
							{
								id: 3,
								name: "四川眉山爱媛38号果冻橙",
								image: "/static/image/goods/10.png",
								price: 19.8,
								unit: "份",
								type: ["有机食品", "水果"],
								service: ["特价", "7天保价"]
							},
							{
								id: 4,
								name: "江苏无锡 爱媛38号果冻橙",
								image: "/static/image/goods/11.png",
								price: 19.8,
								unit: "份",
								type: ["有机食品", "水果"],
								service: ["特价", "24H发货"]
							},
							{
								id: 5,
								name: "浙江象山 爱媛红美人礼盒",
								image: "/static/image/goods/12.png",
								price: 19.8,
								unit: "份",
								type: ["有机食品", "水果"],
								service: ["特价", "24H发货"]
							}
						]
					},
					{
						id: 2,
						name: "肉禽蛋品",
						goods: [{
								id: 6,
								name: "四川爱媛38号可吸果冻橙",
								image: "/static/image/goods/9.png",
								price: 19.8,
								unit: "份",
								service: ["特价", "24H发货"]
							},
							{
								id: 7,
								name: "四川眉山 爱媛38号可吸果冻橙礼盒装12",
								image: "/static/image/goods/9.png",
								price: 19.8,
								unit: "份",
								service: ["特价", "24H发货"]
							},
							{
								id: 8,
								name: "四川眉山爱媛38号果冻橙",
								image: "/static/image/goods/9.png",
								price: 19.8,
								unit: "份",
								service: ["特价", "24H发货"]
							},
							{
								id: 9,
								name: "江苏无锡 爱媛38号果冻橙",
								image: "/static/image/goods/9.png",
								price: 19.8,
								unit: "份",
								service: ["特价", "24H发货"]
							},
							{
								id: 10,
								name: "浙江象山 爱媛红美人礼盒",
								image: "/static/image/goods/9.png",
								price: 19.8,
								unit: "份",
								service: ["特价", "24H发货"]
							}
						]
					},
					{
						id: 3,
						name: "海鲜水产",
						goods: []
					},
					{
						id: 4,
						name: "速食冷冻",
						goods: []
					},
					{
						id: 5,
						name: "粮油米面",
						goods: []
					}
				],
				scrollTop: 0, //tab标题的滚动条位置
				current: 1, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		onShow() {
			this.initData();
		},
		methods: {
			// 切换栏目
			initData() {
				let that = this;
				uni.getStorage({
					key: 'category_tab_id',
					success: function(res) {
						that.current = res.data;
					}
				});
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				this.$utils.setStorage('category_tab_id', index)
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			// 跳转搜索页面
			search() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			},
			// 添加到购物车
			addCart(id) {
				this.$utils.toastTip("添加购物车成功！");
			},
			// 跳转商品详情
			goodsDetail() {
				uni.navigateTo({
					url: '/pages/goods/goods'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		background: #F8F9FA;

		.search-box {
			background: #FFFFFF;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			padding: 14rpx 40rpx;
			width: 100%;

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

		.search-txt {
			font-size: 28rpx;
			color: #666666;
		}
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 14rpx 40rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
		background: #F8F9FA;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-line-1 {
		padding: 20rpx 10rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.thumb-box {
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;

		.goods-left {
			max-width: 180rpx;
			max-height: 180rpx;

			image {
				width: 180rpx;
				height: 180rpx;
				border-radius: 4px;
			}
		}

		.goods-right {
			flex: 1;
			border-bottom: 1rpx solid #EBEBEB;
			padding-bottom: 22rpx;
			margin: 0rpx 24rpx;

			.goods-name {
				font-size: 26rpx;
				font-weight: 700;
				line-height: 34rpx;
				color: #333333;
				margin-top: 10rpx;

				text {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}

			.goods-type {
				font-size: 22rpx;
				color: #999999;
				margin-top: 4rpx;
			}

			.goods-service {
				display: flex;
				align-items: center;
				margin-top: 18rpx;
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


			.goods-price {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 4rpx;

				.goods-price-txt {
					color: #F55726;
					font-size: 32rpx;
					font-weight: 600;

					.goods-price-unit {
						font-size: 22rpx;
						color: #999999;
						font-weight: normal;
					}
				}

				.goods-shopcar-icon {
					width: 44rpx;
					height: 44rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>