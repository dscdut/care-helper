class RegisterPatientRequestDTO {
  RegisterPatientRequestDTO({
    required this.token,
    required this.password,
  });

  Map<String, dynamic> toJson() => {
        'token': token,
        'password': password,
      };

  final String token;
  final String password;
}
