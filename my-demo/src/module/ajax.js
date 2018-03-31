/*
	转义base64
	let _img = this.baseImg
	_img = _img.split('+').join('%2B').split('&').join('%26')
	或者
	_img = _img.replace(/\+/g, "%2B").replace(/\&/g, "%26")
*/
export default {
	website: 'http://yinshimei.data.cuci.cc/',
	post (url, sendData, successHandler, errorHandler) {
		var _data = '';
		for (var key in sendData) {
			_data += '&' + key + '=' + sendData[key];
		}
		_data = _data.slice(1);
		if (window.fetch) {
			fetch(this.website + url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: _data
			}).then(response => {
				return response.json();
			}).then(indexContentData => {
				if (typeof successHandler === 'function') successHandler(indexContentData);
			}).catch(error => {
				if (typeof errorHandler === 'function') errorHandler(error);
			})
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.website + url);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(_data);
			xhr.onreadystatechange = event => {
				if (event.target.readyState !== 4) return ;
				if (event.target.status === 200 || event.target.status === 304) {
					if (typeof successHandler === 'function') successHandler(JSON.parse(event.target.responseText));
				} else {
					if (typeof errorHandler === 'function') errorHandler(event.target.status);
				}
			}
		}
	},
	get (url, sendData, successHandler, errorHandler) {
		var _data = '';
		for (var key in sendData) {
			_data += '&' + key + '=' + sendData[key];
		}
		_data = '?'+_data.slice(1);
		if (window.fetch) {
			fetch(this.website + url + _data).then(response => {
				return response.json();
			}).then(indexContentData => {
				if (typeof successHandler === 'function') successHandler(indexContentData);
			}).catch(error => {
				if (typeof errorHandler === 'function') errorHandler(error);
			})
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', this.website + url + _data);
			xhr.onreadystatechange = event => {
				if (event.target.readyState !== 4) return ;
				if (event.target.status === 200 || event.target.status === 304) {
					if (typeof successHandler === 'function') successHandler(JSON.parse(event.target.responseText));
				} else {
					if (typeof errorHandler === 'function') errorHandler(event.target.status);
				}
			}
		}
	}
}
