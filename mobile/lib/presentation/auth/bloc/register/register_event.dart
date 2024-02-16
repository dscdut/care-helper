part of 'register_bloc.dart';

abstract class RegisterEvent {}

class SubmitPhoneNumberEvent extends RegisterEvent {
  final GetTokenByPhoneRequestDTO param;

  SubmitPhoneNumberEvent(this.param);
}

class VerifyOtpEvent extends RegisterEvent {
  final VerifyOtpRequestDTO params;

  VerifyOtpEvent(this.params);
}

class RegisterPatientEvent extends RegisterEvent {
  final RegisterPatientRequestDTO params;

  RegisterPatientEvent(this.params);
}
