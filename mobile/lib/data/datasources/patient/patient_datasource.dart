import 'package:flutter_template/data/datasources/patient/remote/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';

class PatientDataSource {
  PatientDataSource({required PatientRemoteDataSource remoteDataSource})
      : _remoteDataSource = remoteDataSource;

  final PatientRemoteDataSource _remoteDataSource;

  Future<void> getToken(GetTokenByPhoneRequestDTO param) async {
    await _remoteDataSource.getToken(param);
  }

  Future<void> verifyOtp(VerifyOtpRequestDTO params) async {
    await _remoteDataSource.verifyOtp(params);
  }

  Future<void> register(RegisterPatientRequestDTO params) async {
    await _remoteDataSource.register(params);
  }
}
