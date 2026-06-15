<template>
	<view class="container">
		<view class="userinfo">
			<view class="item">
				<view class="item-left">
					<text>头像</text>
				</view>
				<view class="item-right">
					<image class="avatar" src="/static/image/avatar/1.png"></image>
					<image class="righticon" src="/static/icon/right.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="item-left">
					<text>昵称</text>
				</view>
				<view class="item-right">
					<text>建材老王AAA</text>
				</view>
			</view>
			<view class="item">
				<view class="item-left">
					<text>ID</text>
				</view>
				<view class="item-right">
					<text>518518518</text>
				</view>
			</view>
			<view class="item">
				<view class="item-left">
					<text>手机号</text>
				</view>
				<view class="item-right">
					<text>15800000000</text>
				</view>
			</view>
		</view>
		<view class="address">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

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
	.userinfo {
		border-radius: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
		margin: 20rpx 30rpx 30rpx 30rpx;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #ECECEC;
			padding: 0rpx 30rpx;

			.item-left {
				padding: 30rpx 0rpx;
				text {
					font-size: 30rpx;
					color: #333333;
				}
			}

			.item-right {
				display: flex;
				align-items: center;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.righticon {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>