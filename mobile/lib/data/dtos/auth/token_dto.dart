class TokenDTO {
  TokenDTO({
    this.accessToken,
    this.refreshToken,
  });

  factory TokenDTO.fromJson(Map<String, dynamic> json) {
    return TokenDTO(
      accessToken: json['accessToken'] as String?,
      refreshToken: json['refreshToken'] as String?,
    );
  }

  final String? accessToken;
  final String? refreshToken;
}
