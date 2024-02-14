import 'package:flutter_template/data/datasources/patient/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';

class PatientRepository {
  PatientRepository({
    required PatientDataSource dataSource,
  }) : _dataSource = dataSource;

  final PatientDataSource _dataSource;

  Future<void> getToken(GetTokenByPhoneRequestDTO param) =>
      _dataSource.getToken(param);

  Future<void> verifyOtp(VerifyOtpRequestDTO params) =>
      _dataSource.verifyOtp(params);

  Future<void> register(RegisterPatientRequestDTO params) =>
      _dataSource.register(params);
}
