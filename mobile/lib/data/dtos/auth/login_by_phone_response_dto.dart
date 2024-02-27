import 'package:flutter_template/data/dtos/auth/refresh_token_dto.dart';
import 'package:flutter_template/data/models/patient_model.dart';

class LoginByPhoneResponseDTO {
  LoginByPhoneResponseDTO({
    required this.patient,
    required this.accessToken,
    required this.refreshToken,
  });

  factory LoginByPhoneResponseDTO.fromJson(Map<String, dynamic> json) {
    return LoginByPhoneResponseDTO(
      patient: PatientModel.fromJson(json['user'] as Map<String, dynamic>),
      accessToken: json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
    );
  }

  final PatientModel patient;
  final String accessToken;
  final String refreshToken;

  RefreshTokenDTO toRefreshTokenDTO() {
    return RefreshTokenDTO(
      accessToken: accessToken,
      refreshToken: refreshToken,
    );
  }
}
