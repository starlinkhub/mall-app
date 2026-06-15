<template>
	<view class="container">
		<view class="address" v-for="(item, index) in list" :key="item.id">
			<view class="address-info">
				<view class="address-info-top">
					<text class="tag" v-if="item.tag">{{item.tag}}</text>
					<text class="name">{{item.name}}</text>
					<text class="phone">{{item.phone}}</text>
				</view>
				<view class="address-info-bottom">
					{{item.address}}
				</view>
			</view>
			<view class="edit-icon">
				<image src="/static/icon/edit.png"></image>
			</view>
		</view>
		<view class="btn">
			<button @click="add()">添加新地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					id: 1,
					name: "小明",
					phone: "15800123213",
					address: "北京市海淀区恒大新宏福苑西区21号楼2单元301",
					tag: "家"
				}, {
					id: 2,
					name: "小红",
					phone: "15800345435",
					address: "北京市海淀区恒大新宏福苑西区22号楼4单元301",
					tag: "公司"
				}, {
					id: 3,
					name: "小刚",
					phone: "15802343400",
					address: "北京市海淀区恒大新宏福苑西区23号楼1单元301",
					tag: ""
				}]
			}
		},
		methods: {
			add() {
				uni.navigateTo({
					url: "/pages/address/add"
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
	.container {
		margin: 20rpx 30rpx;
	}

	.address {
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 32rpx 20rpx;
		margin-bottom: 22rpx;

		.address-info {
			display: flex;
			flex-direction: column;
			padding: 0rpx 40rpx 0rpx 20rpx;

			.address-info-top {
				font-size: 30rpx;
				font-weight: 600;
				color: #333333;

				.tag {
					background: #D5EBD3;
					border-radius: 10rpx;
					font-size: 16rpx;
					color: #40AE36;
					padding: 4rpx 8rpx;
					margin-right: 16rpx;
				}

				.name {
					margin-right: 16rpx;
				}
			}

			.address-info-bottom {
				font-size: 26rpx;
				color: #999999;
				margin-top: 10rpx;
			}
		}

		.edit-icon {

			image {
				width: 52rpx;
				height: 52rpx;
			}
		}
	}

	.btn {
		margin-top: 70rpx;
		width: 100%;

		button {
			flex: 1;
			border-radius: 46rpx;
			background: #40AE36;
			color: #FFFFFF;
			font-size: 30rpx;
			padding: 12rpx 0rpx;
		}
	}
</style>