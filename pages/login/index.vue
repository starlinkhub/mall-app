<template>
	<view class="container">
		<view class="titile">
			<text>手机号码登录</text>
		</view>

		<view class="form">
			<form @submit="">
				<view class="form-item">
					<input class="phone" name="input" placeholder="请输入手机号" placeholder-class="input-placeholder"
						v-model="phone" />
				</view>
				<view class="form-item code">
					<input class="code" name="input" placeholder="请输入手机验证码" placeholder-class="input-placeholder"
						v-model="code" />
					<text :class="tipsStyle" @click="getCode()">{{ tips }}</text>
				</view>
				<view class="login" @click="login()">
					<button :class="loginBtnStyle" form-type="submit">登录</button>
				</view>
			</form>

			<view class="register" @click="register()">
				<text>新用户注册</text>
				<image src="/static/icon/login-right.svg"></image>
			</view>
		</view>

		<view class="bottom">
			<text>其他登录方式</text>
			<view class="other">
				<view class="wx">
					<image src="/static/icon/login-other-wx.svg"></image>
				</view>
				<view class="qq">
					<image src="/static/icon/login-other-qq.svg"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				tips: '获取验证码',
				tipsStatus: 0, //0=可以获取,1=正在倒计时,2=重复获取
				tipsStyle: 'tipsStyle',
				seconds: 60,
				phone: '',
				code: '',
				loginBtnStyle: 'loginBtnStyle close',
			};
		},
		onLoad() {

		},
		watch: {
			// 如果表单正常输入则可以点击登录
			phone(newVal, oldVal) {
				if (this.$utils.checkPhone(newVal) && this.code.length >= 4) {
					this.loginBtnStyle = 'loginBtnStyle open'
				} else {
					this.loginBtnStyle = 'loginBtnStyle close'
				}
			},
			code(newVal, oldVal) {
				if (newVal.length >= 4 && this.$utils.checkPhone(this.phone)) {
					this.loginBtnStyle = 'loginBtnStyle open'
				} else {
					this.loginBtnStyle = 'loginBtnStyle close'
				}
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				let valid = this.$utils.checkPhone(this.phone);
				if (!valid) {
					this.$utils.toastTip('手机号格式错误', 'error');
					return;
				}
				// 修改样式
				this.tipsStyle = 'tipsStyle1'
				if (this.tipsStatus == 1) {
					return
				};
				uni.showLoading({
					title: '正在获取验证码'
				});
				setTimeout(() => {
					uni.hideLoading();
					this.$utils.toastTip('获取成功', 'success')
				}, 2000);
				this.tipsStatus = 1;
				// 开始倒计时
				this.timer = setInterval(() => {
					this.seconds -= 1;
					this.tips = this.seconds + 's后重新获取';
					if (this.seconds < 1) {
						this.clearTimer();
						this.tipsStatus = 0;
						this.tips = '重新获取';
						this.seconds = 10;
						this.tipsStyle = 'tipsStyle2'
					}
				}, 1000);
			},
			clearTimer() {
				if (this.timer) {
					clearTimeout(this.timer);
					this.timer = null;
				}
			},
			// 跳转首页
			login() {
				let valid = this.$utils.checkPhone(this.phone);
				if (!valid) {
					this.$utils.toastTip('手机号格式错误', 'error');
					return;
				}
				if (this.code.length < 1) {
					this.$utils.toastTip('请填写验证码', 'error');
					return;
				}
				// 绑定登录接口
				this.$utils.toastTip('登录成功', 'success')
				setTimeout(() => {
					uni.hideLoading();
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}, 2000);
			},
			// 跳转注册页面
			register() {
				uni.navigateTo({
					url: '/pages/register/index'
				})
			}
		},
		onUnload() {
			// clearTime
			this.clearTimer();
		},
	}
</script>

<style>
	.input-placeholder {
		font-size: 30rpx;
		color: #CCC8C8;
	}
</style>

<style lang="scss" scoped>
	.container {
		padding: 56rpx;
	}

	.titile {
		margin-top: 100rpx;

		text {
			font-size: 48rpx;
			font-weight: bold;
			color: #262424;
		}
	}

	.form {
		margin-top: 100rpx;
	}

	.form-item {
		margin: 30rpx 0rpx;
		border-bottom: 1rpx solid #F0F0F0;

		input {
			padding: 16rpx 0rpx;
		}
	}

	.form-item.code {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tipsStyle {
		font-size: 24rpx;
		color: #E9B921;
	}

	.tipsStyle1 {
		font-size: 24rpx;
		color: #CCC8C8;
	}

	.tipsStyle2 {
		font-size: 24rpx;
		color: #40AE36;
	}

	.login {
		margin-top: 50rpx;

		.loginBtnStyle {
			display: inline-block;
			width: 100%;
			color: #FFFFFF;
			font-size: 30rpx;
			border-radius: 45rpx;
			opacity: 1;
			line-height: 90rpx;
		}

		.loginBtnStyle.open {
			background: #40AE36;
		}

		.loginBtnStyle.close {
			background: #8CCE86;
		}
	}

	.register {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #666262;
		margin-top: 40rpx;

		image {
			width: 10rpx;
			height: 22rpx;
			margin-left: 8rpx;
		}
	}

	.bottom {
		position: fixed;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%);
		text-align: center;

		text {
			font-size: 26rpx;
			color: #999393;
		}
	}

	.other {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;

		.wx {
			margin-right: 75rpx;
		}

		.qq {
			margin-left: 75rpx;
		}

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>