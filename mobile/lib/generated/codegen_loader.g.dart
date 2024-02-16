// DO NOT EDIT. This is code generated via package:easy_localization/generate.dart

// ignore_for_file: prefer_single_quotes

import 'dart:ui';

import 'package:easy_localization/easy_localization.dart' show AssetLoader;

class CodegenLoader extends AssetLoader{
  const CodegenLoader();

  @override
  Future<Map<String, dynamic>?> load(String path, Locale locale) {
    return Future.value(mapLocales[locale.toString()]);
  }

  static const Map<String,dynamic> en = {
  "texts": {
    "notification": "Notification",
    "success": "Success",
    "error_occur": "An error has occurred, please try again later",
    "email_address": "Email Address",
    "password": "Password"
  },
  "button": {
    "cancel": "Cancel",
    "confirm": "Confirm",
    "try_again": "Try again"
  },
  "root": {
    "home": "Home",
    "profile": "Profile",
    "management": "Management"
  },
  "auth": {
    "welcome_back": "Nice to have you back!",
    "sign_in": "Sign in",
    "sign_up": "Sign up",
    "forgot_password": "Forgot password?",
    "log_in": "Log in",
    "enter_phone": "Enter your phone number",
    "enter_phone_detail": "Please enter your phone number in the form below",
    "phone_number": "Phone number",
    "phone_check": "Enter 10 digit phone number",
    "auth": "Authentication",
    "auth_detail": "6 digit code has been sent to ",
    "wrong_pin": "Wrong PIN",
    "not_receive_code": "Haven't receive the code?",
    "send_pin_again": "Send PIN again in 00:00",
    "resend": "Resend",
    "new_password": "New password",
    "easy_remember_password": "Enter a password that's easy to remember",
    "password": "Password",
    "password_recommnend": "Password must be at least 8 characters",
    "confirm_password": "Confirm password",
    "password_not_match": "Password and confirm password not match"
  },
  "validator": {
    "email_required": "Please enter your email",
    "password_required": "Please enter your password",
    "invalid_email": "Invalid email address",
    "incorrect_email_password": "Incorrect email or password",
    "invalid_password": "Password must be at least 8 characters",
    "field_required": "This field is required",
    "not_match_password": "Password and confirm password not match"
  },
  "loading": {
    "ads": "Loading ads..."
  },
  "action": {
    "continue": "Continue",
    "submit": "Submit",
    "save": "Save"
  }
};
static const Map<String,dynamic> vi = {
  "texts": {
    "notification": "Thông báo",
    "success": "Thành công",
    "error_occur": "Đã có lỗi xảy ra, vui lòng thử lại sau",
    "email_address": "Email",
    "password": "Mật khẩu"
  },
  "button": {
    "cancel": "Hủy",
    "confirm": "Xác nhận",
    "try_again": "Thử lại"
  },
  "root": {
    "home": "Trang chủ",
    "profile": "Cá nhân",
    "management": "Quản lý"
  },
  "auth": {
    "welcome_back": "Rất vui khi được gặp lại bạn!",
    "sign_in": "Đăng nhập",
    "sign_up": "Đăng ký",
    "forgot_password": "Quên mật khẩu?",
    "log_in": "Đăng nhập",
    "enter_phone": "Nhập số điện thoại của bạn",
    "enter_phone_detail": "Mời nhập số điện thoại vào ô bên dưới",
    "phone_number": "Số điện thoại",
    "phone_check": "Nhập đủ 10 chữ số",
    "auth": "Xác thực",
    "auth_detail": "6 ký tự đã được gửi đến ",
    "wrong_pin": "Sai mã PIN",
    "not_receive_code": "Không nhận được mã PIN?",
    "send_pin_again": "Gửi lại mã PIN trong 00:00",
    "resend": "Gửi lại",
    "new_password": "Mật khẩu mới",
    "easy_remember_password": "Nhập mật khẩu dễ nhớ",
    "password": "Mật khẩu",
    "password_recommnend": "Mật khẩu nên có ít nhất 8 ký tự",
    "confirm_password": "Xác nhận mật khẩu",
    "password_not_match": "Mật khẩu xác nhận không trùng khớp"
  },
  "validator": {
    "email_required": "Vui lòng nhập email",
    "password_required": "Vui lòng nhập mật khẩu",
    "invalid_email": "Không đúng định dạng email",
    "incorrect_email_password": "Email hoặc mật khẩu không đúng",
    "invalid_password": "Mật khẩu phải có ít nhất 8 kí tự",
    "field_required": "Không được để trống",
    "not_match_password": "Mật khẩu xác nhận không trùng khớp"
  },
  "loading": {
    "ads": "Đang tải quảng cáo..."
  },
  "action": {
    "continue": "Tiếp tục",
    "submit": "Gửi đi",
    "save": "Lưu"
  }
};
static const Map<String, Map<String,dynamic>> mapLocales = {"en": en, "vi": vi};
}
