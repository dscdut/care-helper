// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:json_annotation/json_annotation.dart';

import 'package:flutter_template/data/models/prescription_detail_model.dart';

part 'prescription_model.g.dart';

@JsonSerializable(createToJson: false)
class PrescriptionModel {
  final String note;
  final List<PrescriptionDetailModel> details;
  final DateTime startDate;
  final DateTime endDate;
  final String prescriptionFilename;
  final int examinationId;
  PrescriptionModel({
    required this.note,
    required this.details,
    required this.startDate,
    required this.endDate,
    required this.prescriptionFilename,
    required this.examinationId,
  });

  factory PrescriptionModel.fromJson(Map<String, dynamic> json) =>
      _$PrescriptionModelFromJson(json);
}
