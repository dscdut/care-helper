// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'prescription_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PrescriptionModel _$PrescriptionModelFromJson(Map<String, dynamic> json) =>
    PrescriptionModel(
      note: json['note'] as String,
      details: (json['details'] as List<dynamic>)
          .map((e) =>
              PrescriptionDetailModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      prescriptionFilename: json['prescriptionFilename'] as String,
      examinationId: json['examinationId'] as int,
    );
