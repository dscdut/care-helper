import 'package:flutter_template/data/models/patient_model.dart';

class UpdateAdministrativeResponseDTO {
  UpdateAdministrativeResponseDTO({
    required this.patient,
  });

  factory UpdateAdministrativeResponseDTO.fromJson(Object json) {
    return UpdateAdministrativeResponseDTO(
      patient: PatientModel.fromJson(json as Map<String, dynamic>),
    );
  }

  final PatientModel patient;
}
