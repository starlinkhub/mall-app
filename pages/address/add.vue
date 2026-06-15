<template>
	<view class="container">
		<view class="content">
			<form @submit="formSubmit">
				<view class="user">
					<view class="form-item">
						<view class="item-lable">收件人</view>
						<view class="item-input">
							<input name="name" placeholder="请输入昵称" />
						</view>
					</view>
					<view class="form-item">
						<view class="item-lable">手机号</view>
						<view class="item-input">
							<input name="phone" placeholder="请输入手机号" />
						</view>
					</view>
				</view>

				<view class="address">
					<view class="form-item">
						<view class="item-lable">地址</view>
						<view class="item-input">
							<input name="address" placeholder="选择地址" @click="addressPop()" :value="address" disabled />
						</view>
						<u-picker mode="region" v-model="showPicker" @confirm="addressConfirm"></u-picker>
					</view>
					<view class="form-item">
						<view class="item-lable">门牌号</view>
						<view class="item-input">
							<input name="house" placeholder="例：1栋101室" />
						</view>
					</view>
				</view>

				<view class="tags">
					<text :class="[selected === item.id ? 'tags-active' : '']" v-for="(item,index) in tags"
						:key="item.id" @click="changeTag(item.id)">{{item.name}}</text>
				</view>

				<view class="btn">
					<button form-type="submit">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPicker: false,
				selected: 1,
				address: "",
				tags: [{
						id: 1,
						name: "家"
					},
					{
						id: 2,
						name: "公司"
					},
					{
						id: 3,
						name: "代收点"
					}
				],
			}
		},
		methods: {
			// 打开/关闭地址Picker
			addressPop() {
				this.showPicker = !this.showPicker;
			},
			// Picker回调
			addressConfirm(e) {
				this.address = e.province.label + " " + e.city.label + " " + e.area.label;
			},
			// 更改标签
			changeTag(i) {
				this.selected = i;
			},
			// 表单提交
			formSubmit: function(e) {
				var formdata = e.detail.value;

				if (formdata.name == "") {
					this.$utils.toastTip('请输入收件人姓名');
					return;
				}
				if (!this.$utils.checkPhone(formdata.phone)) {
					this.$utils.toastTip('手机号格式错误');
					return;
				}
				if (formdata.address == "") {
					this.$utils.toastTip('请选择城市');
					return;
				}
				if (formdata.house == "") {
					this.$utils.toastTip('请填写详细地址');
					return;
				}
				formdata.tagid = this.selected;

				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(formdata))

				this.$utils.toastTip("添加成功！")
				setTimeout(function() {
					uni.navigateBack()
				}, 2000);
			},
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

	.content {
		display: flex;
		align-items: center;

		.user {
			background: #FFFFFF;
			padding: 32rpx;
			border-radius: 20rpx;
			margin-bottom: 22rpx;
		}

		.form-item {
			display: inline-block;
			width: 100%;
			margin-bottom: 40rpx;

			.item-lable {
				font-size: 28rpx;
				font-weight: 600;
			}

			.item-input {
				margin-top: 10rpx;
				background: #F6F7F8;
				border-radius: 20rpx;

				input {
					font-size: 28rpx;
					padding: 28rpx 40rpx;
				}
			}
		}

		.address {
			background: #FFFFFF;
			padding: 32rpx;
			border-radius: 20rpx;
			margin-bottom: 22rpx;
		}

		.tags {
			margin-top: 34rpx;
			background: #FFFFFF;
			padding: 32rpx;
			border-radius: 20rpx;
			margin-bottom: 22rpx;

			text {
				font-size: 28rpx;
				width: 160rpx;
				margin-right: 24rpx;
				color: #333333;
				padding: 10rpx 50rpx;
				border-radius: 16rpx;
				background: #F8F9FA;
			}

			.tags-active {
				color: #333333;
				font-weight: 600;
				background: #D9EFD7;
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