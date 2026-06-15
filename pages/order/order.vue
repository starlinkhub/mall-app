<template>
	<view class="container">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" font-size="26"
			inactive-color="#666666" active-color="#40AE36"></u-tabs>
		<view class="content">
			<view class="order" v-for="(item, index) in orderList" :key="item.id">
				<view @click="goDetail()">
					<view class="order-top">
						<text class="time">{{item.time}}</text>
						<text
							:class="[item.status== '待付款' ? 'status-nopay': '', item.status=='待发货'? 'status-pay': '',item.status=='待收货'? 'status-pay': '',item.status=='待评价'? 'status-comment': '',item.status=='已取消'? 'status-cancel': '']">{{item.status}}</text>
					</view>
					<view class="shopname">{{item.shopname}}</view>
					<view class="logistics" v-if="item.status=='待收货'">
						<view class="logistics-left">
							<image src="/static/icon/logistics.png"></image>
							<view class="logistics-info">
								<text class="logistics-address">[北京市] [北京综合邮件处理中心]，下一站</text>
								<text class="logistics-time">2021.12.28 10:31:11</text>
							</view>
						</view>
						<view class="logistics-right">
							<image src="/static/icon/right.png"></image>
						</view>
					</view>
					<view class="order-middle">
						<view class="image">
							<image src="/static/image/goods/13.png"></image>
							<image src="/static/image/goods/14.png"></image>
						</view>
						<view class="info">
							<text class="num">共{{item.num}}件</text>
							<text>合计:<text class="price">￥{{item.price}}</text></text>
						</view>
					</view>
				</view>
				<view class="order-bottom">
					<view class="btns">
						<button class="cancel" v-if="item.status=='待付款' || item.status=='待发货'"
							@click="cancelOrder()">取消订单</button>
						<button class="cancel" v-if="item.status=='待收货' || item.status=='待评价'">再来一单</button>
						<button class="pay" v-if="item.status=='待付款'" @click="goPayment()">去支付</button>
						<button class="pay" v-if="item.status=='待发货'" @click="remind()">提醒发货</button>
						<button class="pay" v-if="item.status=='待收货'">确认收货</button>
						<button class="cancel" v-if="item.status=='待评价'">退款/售后</button>
						<button class="pay" v-if="item.status=='待评价'" @click="goComment()">去评价</button>
					</view>
				</view>
			</view>

			<!-- 内容为空 -->
			<view class="empty" v-if="orderList.length == 0">
				<u-empty text="抱歉，没有订单数据" mode="order"></u-empty>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '待发货',
				}, {
					name: '待收货',
				}, {
					name: '待评价',
				}],
				current: 0,
				orderList: [],
				orderTotal: [{
					id: 1,
					time: "2021.12.27 12:23",
					status: "待付款",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}, {
					id: 2,
					time: "2021.12.27 12:23",
					status: "待发货",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}, {
					id: 3,
					time: "2021.12.27 12:23",
					status: "待收货",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}, {
					id: 4,
					time: "2021.12.27 12:23",
					status: "待评价",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}, {
					id: 5,
					time: "2021.12.27 12:23",
					status: "已取消",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}],
				orderNopay: [{
					id: 1,
					time: "2021.12.27 12:23",
					status: "待付款",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}],
				orderPay1: [{
					id: 2,
					time: "2021.12.27 12:23",
					status: "待发货",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}],
				orderPay2: [{
					id: 3,
					time: "2021.12.27 12:23",
					status: "待收货",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}],
				orderComment: [{
					id: 4,
					time: "2021.12.27 12:23",
					status: "待评价",
					shopname: "生鲜超市",
					num: "2",
					price: "76.6"
				}]
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 数据初始化
			getData() {
				this.orderList = this.orderTotal
			},
			// 切换订单状态
			change(index) {
				this.current = index;
				if (index == 0) {
					this.orderList = this.orderTotal
				} else if (index == 1) {
					this.orderList = this.orderNopay
				} else if (index == 2) {
					this.orderList = this.orderPay1
				} else if (index == 3) {
					this.orderList = this.orderPay2
				} else if (index == 4) {
					this.orderList = this.orderComment
				}
			},
			// 跳转订单详情
			goDetail() {
				uni.navigateTo({
					url: "/pages/order/detail"
				})
			},
			// 跳转去评价页面
			goComment() {
				uni.navigateTo({
					url: "/pages/order/comment"
				})
			},
			// 跳转去支付页面
			goPayment() {
				uni.navigateTo({
					url: "/pages/cart/payment"
				})
			},
			// 提醒发货
			remind() {
				this.$utils.toastTip("已向商家发送发货提醒");
			},
			// 取消订单
			cancelOrder() {
				this.$utils.showConfirm("确定要取消订单吗？").then(res => {
					if (res.confirm) {
						this.$utils.toastTip("取消成功！");
					}
				});
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
	.container {
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.content {
		padding: 30rpx;
	}

	.order {
		border-radius: 20rpx;
		background: #FFFFFF;
		padding: 24rpx 30rpx 30rpx 30rpx;
		margin-bottom: 22rpx;

		.order-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #ECECEC;
			padding-bottom: 22rpx;

			.time {
				font-size: 26rpx;
				color: #999999;
			}

			.status-nopay {
				font-size: 26rpx;
				color: #F55726;
			}

			.status-pay {
				font-size: 26rpx;
				color: #26ACF5;
			}

			.status-comment {
				font-size: 26rpx;
				color: #40AE36;
			}

			.status-cancel {
				font-size: 26rpx;
				color: #999999;
			}
		}

		.shopname {
			font-size: 26rpx;
			color: #333333;
			margin: 20rpx 0rpx;
		}

		.logistics {
			border-radius: 20rpx;
			background: #F8F9FA;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0rpx;
			padding: 20rpx;

			.logistics-left {
				display: flex;
				align-items: center;

				image {
					width: 48rpx;
					height: 48rpx;
				}

				.logistics-info {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					line-height: 40rpx;

					.logistics-address {
						font-size: 24rpx;
						color: #333333;
					}

					.logistics-time {
						font-size: 22rpx;
						color: #999393;
					}
				}
			}

			.logistics-right {
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.order-middle {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.info {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				font-size: 22rpx;
				color: #333333;

				.num {
					font-size: 22rpx;
					color: #999999;
					margin-bottom: 6rpx;
				}

				.price {
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
				}
			}

			image {
				width: 130rpx;
				height: 130rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
		}

		.order-bottom {
			margin-top: 30rpx;

			.btns {
				display: flex;
				justify-content: flex-end;

				button {
					border-radius: 24rpx;
					background-color: #FFFFFF;
					margin: 0;
				}

				button::after {
					border: none;
				}

				.cancel {
					font-size: 24rpx;
					color: #333333;
					border: 1rpx solid #999999;
					margin-right: 20rpx;
				}

				.pay {
					font-size: 24rpx;
					color: #40AE36;
					border: 1rpx solid #40AE36;
				}
			}

		}
	}

	.empty {
		margin-top: 200rpx;
	}
</style>