import 'package:flutter_template/flavors.dart';

abstract class Endpoints {
  static String apiUrl = '${AppFlavor.apiBaseUrl}/api';

  static String login = '$apiUrl/auth/login';
  static String userInfo = '$apiUrl/auth/me';
  static String authOtp = '$apiUrl/auth/otp';
  static String authVerifyOtp = '$apiUrl/auth/verify-otp';
  static String patientRegister = '$apiUrl/auth/register/patient';
  static String updateAdministrative = '$apiUrl/api/patients/';
}
