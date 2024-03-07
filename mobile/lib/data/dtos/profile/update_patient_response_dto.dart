import 'package:flutter_template/data/models/patient_model.dart';

class UpdatePatientResponseDTO {
  UpdatePatientResponseDTO({
    required this.patient,
  });

  factory UpdatePatientResponseDTO.fromJson(Object json) {
    return UpdatePatientResponseDTO(
      patient: PatientModel.fromJson(json as Map<String, dynamic>),
    );
  }

  final PatientModel patient;
}
