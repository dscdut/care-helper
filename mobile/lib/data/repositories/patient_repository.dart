import 'package:flutter_template/data/datasources/patient/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/get_token_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_administrative_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_administrative_response_dto.dart';

class PatientRepository {
  PatientRepository({
    required PatientDataSource dataSource,
  }) : _dataSource = dataSource;

  final PatientDataSource _dataSource;

  Future<GetTokenResponseDTO> getToken(GetTokenByPhoneRequestDTO param) =>
      _dataSource.getToken(param);

  Future<void> verifyOtp(VerifyOtpRequestDTO params) =>
      _dataSource.verifyOtp(params);

  Future<RegisterPatientResponseDTO> register(
    RegisterPatientRequestDTO params,
  ) =>
      _dataSource.register(params);

  Future<UpdateAdministrativeResponseDTO> updateAdministrative(
    UpdateAdministrativeRequestDTO params,
    String token,
  ) =>
      _dataSource.updateAdministrative(params, token);
}
