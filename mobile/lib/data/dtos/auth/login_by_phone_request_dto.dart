class LoginByPhoneRequestDTO {
  LoginByPhoneRequestDTO({
    required this.phone,
    required this.password,
  });

  Map<String, dynamic> toJson() => {
        'phone': phone,
        'password': password,
      };

  final String phone;
  final String password;
}
