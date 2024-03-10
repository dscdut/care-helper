class GetMedicalHistoryResponseDTO {
  GetMedicalHistoryResponseDTO({
    required this.history,
  });

  factory GetMedicalHistoryResponseDTO.fromJson(Map<String, dynamic> json) {
    return GetMedicalHistoryResponseDTO(
      history: json['history'] as String,
    );
  }

  final String history;
}
