class GetTokenByPhoneRequestDTO {
  GetTokenByPhoneRequestDTO({required this.phone});
  final String phone;

  Map<String, dynamic> toJson() => {
        'phone': phone,
      };
}
