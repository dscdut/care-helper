import 'package:flutter_template/flavors.dart';

abstract class Endpoints {
  static String apiUrl = '${AppFlavor.apiBaseUrl}/api';

  static String auth = '$apiUrl/auth';
  static String login = '$auth/login';
  static String userInfo = '$auth/me';
  static String authOtp = '$auth/otp';
  static String authVerifyOtp = '$auth/verify-otp';
  static String patientRegister = '$auth/register/patient';
}
