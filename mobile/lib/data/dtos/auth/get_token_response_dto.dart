class GetTokenResponseDTO {
  GetTokenResponseDTO({required this.token});

  factory GetTokenResponseDTO.fromJson(Map<String, dynamic> json) {
    return GetTokenResponseDTO(
      token: json['token'] as String,
    );
  }

  final String token;
}
