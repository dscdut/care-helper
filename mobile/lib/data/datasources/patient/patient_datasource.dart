import 'package:flutter_template/data/datasources/patient/remote/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/get_token_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_administrative_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_administrative_response_dto.dart';

class PatientDataSource {
  PatientDataSource({required PatientRemoteDataSource remoteDataSource})
      : _remoteDataSource = remoteDataSource;

  final PatientRemoteDataSource _remoteDataSource;

  Future<GetTokenResponseDTO> getToken(GetTokenByPhoneRequestDTO param) async {
    return await _remoteDataSource.getToken(param);
  }

  Future<void> verifyOtp(VerifyOtpRequestDTO params) async {
    await _remoteDataSource.verifyOtp(params);
  }

  Future<RegisterPatientResponseDTO> register(
    RegisterPatientRequestDTO params,
  ) async {
    return await _remoteDataSource.register(params);
  }

  Future<UpdateAdministrativeResponseDTO> updateAdministrative(
    UpdateAdministrativeRequestDTO params,
    String token,
  ) async {
    return await _remoteDataSource.updateAdministrative(params, token);
  }
}
