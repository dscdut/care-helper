part of 'register_bloc.dart';

class RegisterState {
  RegisterState({
    this.error = '',
    this.token = '',
    this.isOtpVerified = false,
    this.isRegistered = false,
  });

  final String error;
  final String token;
  final bool isOtpVerified;
  final bool isRegistered;

  RegisterState copyWith({
    String? error,
    String? token,
    bool? isOtpVerified,
    bool? isRegistered,
  }) {
    return RegisterState(
      error: error ?? this.error,
      token: token ?? this.token,
      isOtpVerified: isOtpVerified ?? this.isOtpVerified,
      isRegistered: isRegistered ?? this.isRegistered,
    );
  }
}
