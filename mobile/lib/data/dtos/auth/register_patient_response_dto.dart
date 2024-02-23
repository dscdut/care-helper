import 'package:flutter_template/data/models/patient_model.dart';

class RegisterPatientResponseDTO {
  RegisterPatientResponseDTO({
    required this.patient,
    required this.accessToken,
    required this.refreshToken,
  });

  factory RegisterPatientResponseDTO.fromJson(Map<String, dynamic> json) {
    return RegisterPatientResponseDTO(
      patient: PatientModel.fromJson(json['user'] as Map<String, dynamic>),
      accessToken: json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
    );
  }

  final PatientModel patient;
  final String accessToken;
  final String refreshToken;
}
