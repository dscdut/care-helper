class VerifyOtpRequestDTO {
  VerifyOtpRequestDTO({
    required this.token,
    required this.otp,
  });

  Map<String, dynamic> toJson() => {
        'token': token,
        'otp': otp,
      };

  final String token;
  final String otp;
}
