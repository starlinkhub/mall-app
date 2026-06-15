const baseUrl = 'https://xxx.cn/';

const createRequest = (opts, data, showLoading = true) => {
	if (showLoading) {
		uni.showLoading({
			title: "加载中..."
		});
	}
	const httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded',
			...(opts.method === 'get' ? {
				"Accept": "application/json"
			} : {}),
			...(opts.token ? {
				'Token': opts.token
			} : {})
		},
		dataType: 'json',
	};

	return new Promise((resolve, reject) => {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (showLoading) {
					uni.hideLoading();
				}
				if (res.statusCode === 200) {
					resolve(res.data); // 根据uni.request的实际响应结构调整  	
				} else {
					uni.showToast({
						title: res?.msg||"服务请求失败",
						duration: 2000,
						icon: "none"
					});
				}

			}
		).catch(
			(response) => {
				if (showLoading) {
					uni.hideLoading();
				}
				reject(response);
			}
		);
	});
};
const uploadFile= (opts, data, method = 'post') => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + opts,
			filePath: data,
			name: 'file',
			header: {
				'Token': uni.getStorageSync('Token'),
				'X-Requested-With': 'XMLHttpRequest',
			},
			success: (res) => {
				uni.hideLoading();
				if (res.statusCode === 200) {
					console.log("文件上传成功",res.data)
					resolve(JSON.parse(res.data)); // 根据uni.request的实际响应结构调整  	
				} else {
					uni.showToast({
						title: res?.msg || "服务请求失败",
						duration: 2000,
						icon: "none"
					});
				}
			},
			fail: (err) => {
				uni.hideLoading();
				uni.showToast({
					title: err?.msg || "服务请求失败",
					duration: 2000,
					icon: "none"
				});
			},
		})
	})
};
const httpRequest = (opts, data,loading=true, method = 'post') => {
	return createRequest({
		url: opts,
		method: method
	}, data,loading);
};

const httpTokenRequest = (opts, data, method = 'post') => {
	 const token = uni.getStorageSync('Token')||"";
	// if (!token) {
	// 	uni.clearStorage()
	// 	uni.showToast({
	// 		title: "请先登录",
	// 		duration: 1500,
	// 		icon: "none"
	// 	});
	// 	setTimeout(() => {
	// 		uni.reLaunch({
	// 			url: '/pages/mine/mine'
	// 		})
	// 	}, 1500)
	// 	return new Promise((resolve, reject) => {resolve({code:""})})
	// }
	return createRequest({
		url: opts,
		method: method,
		token
	}, data);
};

export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	uploadFile
};