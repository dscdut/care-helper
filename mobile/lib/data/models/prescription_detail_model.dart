import 'package:json_annotation/json_annotation.dart';


part 'prescription_detail_model.g.dart';

@JsonSerializable(createToJson: false)
class PrescriptionDetailModel {
  PrescriptionDetailModel({
    required this.medicineName,
    required this.medicineType,
    required this.quantity,
    required this.amount,
    required this.usage,
  });

  final String medicineName;
  final String medicineType;
  final int quantity;
  final String amount;
  final String usage;

  factory PrescriptionDetailModel.fromJson(Map<String, dynamic> json) =>
      _$PrescriptionDetailModelFromJson(json);
}
