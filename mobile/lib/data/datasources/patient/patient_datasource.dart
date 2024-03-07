import 'package:flutter_template/data/datasources/patient/local/patient_datasource.dart';
import 'package:flutter_template/data/datasources/patient/remote/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/get_token_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/login_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/login_by_phone_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_response_dto.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_patient_response_dto.dart';
import 'package:flutter_template/data/models/patient_model.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class PatientDataSource {
  PatientDataSource({
    required PatientRemoteDataSource remoteDataSource,
    required PatientLocalDataSource localDataSource,
  })  : _remoteDataSource = remoteDataSource,
        _localDataSource = localDataSource;

  final PatientRemoteDataSource _remoteDataSource;
  final PatientLocalDataSource _localDataSource;

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

  Future<PatientModel> login(LoginByPhoneRequestDTO params) async {
    final LoginByPhoneResponseDTO response =
        await _remoteDataSource.login(params);

    await _localDataSource.setPatientAuth(response);

    return response.patient;
  }

  PatientModel? getPatientInfo() {
    return _localDataSource.getPatientInfo();
  }

  Future<PatientModel> updatePatientInfo(UpdatePatientRequestDTO params) async {
    final UpdatePatientResponseDTO response =
        await _remoteDataSource.updatePatientInfo(params);

    await _localDataSource.setUpdatedPatientInfo(response);

    return response.patient;
  }
}
