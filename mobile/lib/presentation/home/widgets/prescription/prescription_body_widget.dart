import 'package:flutter/material.dart';
import 'package:flutter_template/data/models/prescription_model.dart';
import 'package:flutter_template/presentation/home/widgets/prescription/prescription_single.dart';

class PrescriptionBodyWidget extends StatelessWidget {
  final PrescriptionModel prescription;

  const PrescriptionBodyWidget({super.key, required this.prescription});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: prescription.details
          .map(
            (med) => PrescriptionSingle(
              prescriptionDetail: med,
            ),
          )
          .toList(),
    );
  }
}
