// DO NOT EDIT. This is code generated via package:easy_localization/generate.dart

// ignore_for_file: prefer_single_quotes, avoid_renaming_method_parameters

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
    "password": "Password",
    "forgot_password": "Forgot password?"
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
    "please_enter_phone_number_and_password": "Please enter your phone number and password",
    "phone_number": "Phone number",
    "must_enter_10_digits": "Must enter 10 digits"
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
  }
};
static const Map<String,dynamic> vi = {
  "texts": {
    "notification": "Thông báo",
    "success": "Thành công",
    "error_occur": "Đã có lỗi xảy ra, vui lòng thử lại sau",
    "email_address": "Email",
    "password": "Mật khẩu",
    "forgot_password": "Quên mật khẩu?"
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
    "please_enter_phone_number_and_password": "Nhập số điện thoại và mật khẩu",
    "phone_number": "Số điện thoại",
    "must_enter_10_digits": "Phải nhập đủ 10 số"
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
  }
};
static const Map<String, Map<String,dynamic>> mapLocales = {"en": en, "vi": vi};
}
