part of 'register_bloc.dart';

class RegisterState {
  RegisterState({
    this.error = '',
    this.isTokenGet = false,
    this.isOtpVerified = false,
    this.isRegistered = false,
  });

  final String error;
  final bool isTokenGet;
  final bool isOtpVerified;
  final bool isRegistered;

  RegisterState copyWith({
    String? error,
    bool? isTokenGet,
    bool? isOtpVerified,
    bool? isRegistered,
  }) {
    return RegisterState(
      error: error ?? this.error,
      isTokenGet: isTokenGet ?? this.isTokenGet,
      isOtpVerified: isOtpVerified ?? this.isOtpVerified,
      isRegistered: isRegistered ?? this.isRegistered,
    );
  }
}
