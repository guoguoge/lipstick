//全局表单验证规则
export const validateName = (rule, value, callback) => { //验证用户中文姓名
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!reg.test(value)) {
    callback(new Error('错误的姓名'));
  } else if (value.length > 8) {
    callback(new Error('姓名长度过长'));
  } else {
    callback();
  }
};

export const validateTel = (rule, value, callback) => { //验证用户手机号
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(value)) {
    callback(new Error('手机号格式错误'));
  } else {
    callback();
  }
};

export const validatePassword = (rule, value, callback) => { //验证用户密码 至少大于八位 数字和字母组合
  let p = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/;
  let contain = p.test(value); //判断是否同时包含英文和字母
  if (!value) {
    callback(new Error('密码不能为空'));
  } else if (value.length < 8) {
    callback(new Error('请输入 8 位以上的密码'));
  } else if (!contain) {
    callback(new Error('请使用数字和字母组合密码'));
  } else {
    callback();
  }
};

export const validatePassconfirm = (rule, value, callback) => { //验证用户中文姓名
  let p = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/;
  let contain = p.test(value); //判断是否同时包含英文和字母
  if (!value) {
    callback(new Error('确认密码不能为空'));
  } else if (value.length < 8) {
    callback(new Error('请输入 8 位以上的密码'));
  } else if (!contain) {
    callback(new Error('请使用数字和字母组合密码'));
  } else if (value != this.form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

export const validateTelcode = (rule, value, callback) => { //验证用户短信验证码
  if (!value) {
    callback(new Error('短信验证码不能为空'));
  } else if (value.length != 6) {
    callback(new Error('请输入 6 位短信验证码'));
  } else {
    callback();
  }
};

export const validateWalletaddress = (rule, value, callback) => { //验证用户短信验证码
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!value) {
    callback(new Error('钱包地址不能为空'));
  } else if (value.length != 42) {
    callback(new Error('钱包地址格式不对'));
  } else if (reg.test(value)) {
    callback(new Error('钱包地址中包含不能包含中文字符'));
  } else {
    callback();
  }
};

export const validateEmail = (rule, value, callback) => {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!value) {
    callback(new Error('邮箱地址不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('邮箱地址格式错误'));
  } else {
    callback();
  }
}

export const validateIdentity = (rule, value, callback) => {
  if (!value) {
    callback(new Error('身份证不能为空'));
  } else if (value.length < 15) {
    callback(new Error('身份证格式不对'));
  } else {
    callback();
  }
}

export const validateGraphcode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('图形验证码不能为空'));
  } else if (value.length < 4) {
    callback(new Error('图形验证码长度不能低于4位')); //验证用户图形验证码
  } else {
    callback();
  }
}
