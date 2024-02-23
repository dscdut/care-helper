import 'package:flutter_template/data/models/prescription_model.dart';
import 'package:flutter_template/data/models/prescription_detail_model.dart';

PrescriptionModel dummyData = PrescriptionModel(
  note: 'Lorem ipsum dolor sit amet',
  details: [
    PrescriptionDetailModel(
      medicineName: 'Paracetamol',
      medicineType: 'Type 1',
      quantity: 2,
      amount: '10mg',
      usage: 'Twice a day',
    ),
  ],
  startDate: DateTime.now(),
  endDate: DateTime.now().add(const Duration(days: 7)),
  prescriptionFilename: 'prescription.pdf',
  examinationId: 12345,
);
