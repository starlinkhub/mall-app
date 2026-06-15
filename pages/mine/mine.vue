<template>
	<view class="container">
		<!-- 用户信息 -->
		<view class="user">
			<view class="user-top">
				<view class="user-top-left" @click="goLogin()">
					<image src="/static/image/avatar/5.jpg"></image>
					<view class="user-info">
						<text class="nickname">巴啦啦臭魔仙</text>
						<text class="phone">13888888888</text>
					</view>
				</view>
				<view class="user-top-right">
					<image @click="toSetting()" src="/static/icon/setting.png"></image>
					<image class="kefu-icon" src="/static/icon/kefu.png"></image>
				</view>
			</view>
			<view class="user-bottom">
				<view class="user-bottom-item" @click="goBalance()">
					<text class="user-bottom-num">100</text>
					<text class="user-bottom-txt">余额(元)</text>
				</view>
				<view class="user-bottom-item">
					<text class="user-bottom-num">10</text>
					<text class="user-bottom-txt">优惠券</text>
				</view>
				<view class="user-bottom-item">
					<text class="user-bottom-num">5</text>
					<text class="user-bottom-txt">电子券</text>
				</view>
				<view class="user-bottom-item" @click="goScore()">
					<text class="user-bottom-num">999</text>
					<text class="user-bottom-txt">积分</text>
				</view>
			</view>

		</view>
		<view class="content">
			<!-- 订单 -->
			<view class="order">
				<view class="order-top">
					<text class="order-top-txt">我的订单</text>
					<view class="order-top-all" @click="toOrder()">
						<text>全部订单</text>
						<image src="/static/icon/right.png"></image>
					</view>
				</view>
				<view class="order-bottom" @click="toOrder()">
					<view class="order-bottom-item">
						<image src="/static/icon/order/daifukuan.png"></image>
						<text>待付款</text>
					</view>
					<view class="order-bottom-item">
						<image src="/static/icon/order/daifahuo.png"></image>
						<text>待发货</text>
					</view>
					<view class="order-bottom-item">
						<image src="/static/icon/order/daishouhuo.png"></image>
						<text>待收货</text>
					</view>
					<view class="order-bottom-item">
						<image src="/static/icon/order/daipingjia.png"></image>
						<text>待评价</text>
					</view>
					<view class="order-bottom-item">
						<image src="/static/icon/order/shouhou.png"></image>
						<text>退款/售后</text>
					</view>
				</view>
			</view>

			<!-- 我的服务 -->
			<view class="service">
				<view class="service-top">
					<text class="service-top-txt">我的服务</text>
				</view>
				<view class="service-bottom">
					<view class="service-bottom-item" @click="toAddress()">
						<image src="/static/icon/service/address.png"></image>
						<text>收货地址</text>
					</view>
					<view class="service-bottom-item" @click="toFootprint()">
						<image src="/static/icon/service/footprint.png"></image>
						<text>浏览记录</text>
					</view>
					<view class="service-bottom-item" @click="toCollect()">
						<image src="/static/icon/service/collect.png"></image>
						<text>我的收藏</text>
					</view>
					<view class="service-bottom-item">
						<image src="/static/icon/service/service.png"></image>
						<text>服务中心</text>
					</view>
					<view class="service-bottom-item">
						<image src="/static/icon/service/kefu.png"></image>
						<text>在线客服</text>
					</view>
				</view>
			</view>

			<!-- 为你推荐 -->
			<view class="recommend">
				<view class="recommend-title">
					<image class="recommend-title-l" src="/static/icon/tit-icon-l.png"></image>
					<text>为你推荐</text>
					<image class="recommend-title-r" src="/static/icon/tit-icon-r.png"></image>
				</view>
				<view class="recommend-goods">
					<view class="goods" v-for="(item, index) in list" :key="item.id">
						<image class="goods-image" :src="item.image"></image>
						<view class="goods-name">
							{{item.name}}
						</view>
						<view class="goods-tag">
							<text v-for="(i, index) in item.service" :key="index">
								{{i}}
							</text>
						</view>
						<view class="goods-price">
							<text class="goods-price-txt">￥{{item.price}}<text class="goods-price-unit">
									/{{item.unit}}</text></text>
							<image class="goods-shopcar-icon" src="/static/icon/shopcar.svg"></image>
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
				list: [{
						id: 1,
						name: '彩食鲜菠菜 270g/份',
						price: '19.9',
						unit: '份',
						image: '/static/image/goods/8.png',
						service: ["特价", "24H发货"],
					},
					{
						id: 2,
						name: '四川爱媛38号可吸果冻橙 1kg/份',
						price: '39.9',
						unit: '箱',
						image: '/static/image/goods/9.png',
						service: ["特价", "24H发货"],
					},
					{
						id: 3,
						name: '云南昆明 有机水果胡萝卜 1.5kg/份',
						price: '38.8',
						unit: '箱',
						image: '/static/image/goods/10.png',
						service: ["特价", "24H发货"],
					},
					{
						id: 4,
						name: '云南香格里拉 野生山核桃 原味150g*',
						price: '39.9',
						unit: '箱',
						image: '/static/image/goods/11.png',
						service: ["特价", "24H发货"],
					},
					{
						id: 5,
						name: '彩食鲜菠菜 270g/份',
						price: '12.8',
						unit: '份',
						image: '/static/image/goods/12.png',
						service: ["特价", "24H发货"],
					},
				]
			};
		},
		methods: {
			// 跳转我的订单页面
			toOrder() {
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			// 跳转设置页面
			toSetting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			// 跳转地址页面
			toAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			// 跳转足迹页面
			toFootprint() {
				uni.navigateTo({
					url: '/pages/mine/footprint'
				})
			},
			// 跳转收藏页面
			toCollect() {
				uni.navigateTo({
					url: '/pages/mine/collect'
				})
			},
			// 跳转登录页面
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			// 跳转余额明细页面
			goBalance() {
				uni.navigateTo({
					url: '/pages/mine/balance'
				})
			},
			// 跳转积分明细页面
			goScore() {
				uni.navigateTo({
					url: '/pages/mine/score'
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
		padding: 30rpx;
	}

	.user {
		border-bottom-left-radius: 60% 15%;
		border-bottom-right-radius: 60% 15%;
		background: linear-gradient(#40AE36, #7AC158);
		opacity: 1;
	}

	.user-top {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;

		.user-top-left {
			display: flex;
			align-items: center;

			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
			}

			.user-info {
				display: flex;
				flex-direction: column;
				margin-left: 30rpx;

				.nickname {
					font-size: 32rpx;
					color: #FFFFFF;
				}

				.phone {
					font-size: 24rpx;
					color: #FFFFFF;
					margin-top: 6rpx;
					opacity: 0.8;
				}
			}
		}

		.user-top-right {
			image {
				width: 48rpx;
				height: 48rpx;
			}

			.kefu-icon {
				margin-left: 20rpx;
			}
		}
	}

	.user-bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-bottom: 160rpx;

		.user-bottom-item {
			display: flex;
			flex-direction: column;
			text-align: center;

			.user-bottom-num {
				font-size: 36rpx;
				color: #FFFFFF;
			}

			.user-bottom-txt {
				font-size: 24rpx;
				color: #FFFFFF;
				opacity: 0.8;
			}

		}
	}

	.order {
		border-radius: 20rpx;
		background: #FFFFFF;
		margin-top: -160rpx;

		.order-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;

			.order-top-txt {
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
			}

			.order-top-all {
				display: flex;
				align-items: center;

				text {
					font-size: 24rpx;
					color: #666666;
				}

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.order-bottom {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding-top: 20rpx;
			padding-bottom: 30rpx;

			.order-bottom-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 52rpx;
					height: 52rpx;
				}

				text {
					font-size: 22rpx;
					color: #666666;
					margin-top: 20rpx;
				}
			}
		}
	}

	.service {
		bservice-radius: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;

		.service-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 30rpx 20rpx 30rpx;

			.service-top-txt {
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
			}

			.service-top-all {
				display: flex;
				align-items: center;

				text {
					font-size: 24rpx;
					color: #666666;
				}

				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}

		.service-bottom {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding-top: 20rpx;
			padding-bottom: 30rpx;

			.service-bottom-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 70rpx;
					height: 70rpx;
				}

				text {
					font-size: 22rpx;
					color: #666666;
					margin-top: 20rpx;
				}
			}
		}
	}

	.recommend {
		margin-top: 50rpx;

		.recommend-title {
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				font-size: 30rpx;
				font-weight: 600;
				color: #333333;
			}

			image {
				width: 40rpx;
				height: 22rpx;
			}

			.recommend-title-l {
				margin-right: 30rpx;
			}

			.recommend-title-r {
				margin-left: 30rpx;
			}
		}

		.recommend-goods {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.goods {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border-radius: 20rpx;
				background: #FFFFFF;
				padding: 0rpx 30rpx 30rpx 30rpx;
				margin-top: 30rpx;
			}

			.goods-image {
				width: 280rpx;
				height: 280rpx;
				border-radius: 4px;
			}

			.goods-name {
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

			.goods-tag {
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

			.goods-price {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 14rpx;

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