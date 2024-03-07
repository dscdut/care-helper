import 'dart:developer';

import 'package:flutter_template/common/constants/endpoints.dart';
import 'package:flutter_template/common/helpers/dio_helper.dart';
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
class PatientRemoteDataSource {
  PatientRemoteDataSource({required DioHelper dioHelper})
      : _dioHelper = dioHelper;

  final DioHelper _dioHelper;

  Future<GetTokenResponseDTO> getToken(GetTokenByPhoneRequestDTO param) async {
    final HttpRequestResponse response = await _dioHelper.post(
      Endpoints.authOtp,
      data: param.toJson(),
    );
    return GetTokenResponseDTO(
      token: response.data['token'],
    );
  }

  Future<void> verifyOtp(VerifyOtpRequestDTO params) async {
    await _dioHelper.post(
      Endpoints.authVerifyOtp,
      data: params.toJson(),
    );
  }

  Future<RegisterPatientResponseDTO> register(
    RegisterPatientRequestDTO params,
  ) async {
    final HttpRequestResponse response = await _dioHelper.post(
      Endpoints.patientRegister,
      data: params.toJson(),
    );

    return RegisterPatientResponseDTO(
      patient: PatientModel.fromJson(response.data['user']),
      accessToken: response.data['accessToken'],
      refreshToken: response.data['refreshToken'],
    );
  }

  Future<LoginByPhoneResponseDTO> login(
    LoginByPhoneRequestDTO params,
  ) async {
    final HttpRequestResponse response = await _dioHelper.post(
      Endpoints.patientLogin,
      data: params.toJson(),
    );
    return LoginByPhoneResponseDTO(
      patient: PatientModel.fromJson(response.data['user']),
      accessToken: response.data['accessToken'],
      refreshToken: response.data['refreshToken'],
    );
  }

  Future<UpdatePatientResponseDTO> updatePatientInfo(
    UpdatePatientRequestDTO params,
  ) async {
    final HttpRequestResponse response = await _dioHelper
        .put(Endpoints.updatePatientInfo, data: params.toJson());

    log('response update patient: ${response.data}');

    return UpdatePatientResponseDTO(
      patient: PatientModel.fromJson(response.data),
    );
  }
}
