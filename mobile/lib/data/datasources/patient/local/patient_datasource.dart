import 'dart:convert';
import 'dart:developer';

import 'package:flutter_template/common/constants/hive_keys.dart';
import 'package:flutter_template/data/dtos/auth/login_by_phone_response_dto.dart';
import 'package:flutter_template/data/dtos/profile/update_patient_response_dto.dart';
import 'package:flutter_template/data/models/patient_model.dart';
import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class PatientLocalDataSource {
  PatientLocalDataSource({
    @Named(HiveKeys.authBox) required Box authBox,
  }) : _authBox = authBox;

  final Box _authBox;

  PatientModel? getPatientInfo() {
    final String? rawData = _authBox.get(HiveKeys.patient);
    log('patient in hive when getting: $rawData');
    if (rawData == null) {
      return null;
    } else {
      return PatientModel.fromJson(
        Map<String, dynamic>.from(jsonDecode(rawData)),
      );
    }
  }

  Future<void> setPatientInfo(PatientModel patient) async {
    await _authBox.put(HiveKeys.patient, jsonEncode(patient.toJson()));
  }

  Future<void> setPatientAuth(LoginByPhoneResponseDTO? response) async {
    if (response == null) {
      log('response null');
      await _authBox.clear();
    } else {
      await _authBox.putAll({
        ...response.toRefreshTokenDTO().toLocalJson(),
        HiveKeys.patient: jsonEncode(response.patient.toJson()),
      });
      log('patient in hive after setting (after login): ${_authBox.get(HiveKeys.patient)}');
    }
  }

  Future<void> setUpdatedPatientInfo(UpdatePatientResponseDTO response) async {
    await _authBox.put(HiveKeys.patient, jsonEncode(response.patient.toJson()));
  }
}
