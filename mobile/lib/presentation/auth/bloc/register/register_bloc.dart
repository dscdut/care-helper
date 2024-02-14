import 'package:bloc/bloc.dart';
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
    on<GetTokenEvent>(_onGetTokenEvent);
    on<VerifyOtpEvent>(_onVerifyOtpEvent);
    on<RegisterPatientEvent>(_onRegisterPatientEvent);
  }

  final PatientRepository _patientRepository;

  void _onGetTokenEvent(
    GetTokenEvent event,
    Emitter<RegisterState> emit,
  ) async {
    try {
      await _patientRepository.getToken(event.param);
      emit(state.copyWith(isTokenGet: true));
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
      emit(state.copyWith(error: err.toString()));
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
      emit(state.copyWith(error: err.toString()));
    }
  }
}
