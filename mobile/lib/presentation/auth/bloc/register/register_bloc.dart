import 'dart:developer';

import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';

part 'register_event.dart';
part 'register_state.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  RegisterBloc({required PatientRepository patientRepository})
      : _patientRepository = patientRepository,
        super(RegisterState()) {
    on<SubmitPhoneNumberEvent>(_onSubmitPhoneNumberEvent);
    on<VerifyOtpEvent>(_onVerifyOtpEvent);
    on<RegisterPatientEvent>(_onRegisterPatientEvent);
  }

  final PatientRepository _patientRepository;

  void _onSubmitPhoneNumberEvent(
    SubmitPhoneNumberEvent event,
    Emitter<RegisterState> emit,
  ) async {
    try {
      final response = await _patientRepository.getToken(event.param);
      log('token: ${response.token}');
      emit(state.copyWith(token: response.token));
    } catch (err) {
      emit(state.copyWith(error: err.toString()));
    }
  }

  void _onVerifyOtpEvent(
    VerifyOtpEvent event,
    Emitter<RegisterState> emit,
  ) async {
    try {
      await _patientRepository.verifyOtp(event.params);

      emit(state.copyWith(isOtpVerified: true));
    } catch (err) {
      emit(
        state.copyWith(
          isOtpVerified: false,
          error: err is DioException
              ? err.response?.data['message']
              : err.toString(),
        ),
      );
    }
  }

  void _onRegisterPatientEvent(
    RegisterPatientEvent event,
    Emitter<RegisterState> emit,
  ) async {
    try {
      await _patientRepository.register(event.params);
      emit(state.copyWith(isRegistered: true));
    } catch (err) {
      emit(
        state.copyWith(
          isRegistered: false,
          error: err is DioException
              ? err.response?.data['message']
              : err.toString(),
        ),
      );
    }
  }
}
