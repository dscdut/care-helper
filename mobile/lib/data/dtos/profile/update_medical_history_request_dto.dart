class UpdateMedicalHistoryRequestDTO {
  UpdateMedicalHistoryRequestDTO({
    this.history,
  });

  Map<String, dynamic> toJson() => {
        'history': history,
      };

  final String? history;
}
