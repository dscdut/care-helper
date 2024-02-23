import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/home/widgets/card_template_widget.dart';
import 'package:flutter_template/presentation/home/widgets/error/no_prescription_widget.dart';
import 'package:flutter_template/presentation/home/widgets/prescription/prescription_body_widget.dart';

import 'package:flutter_template/presentation/home/dummy_data/prescription_dummy_data.dart';

class PrescriptionWidget extends StatelessWidget {
  const PrescriptionWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return CardTemplateWidget(
      title: 'Prescription',
      // body: const NoPrescriptionWidget(),
      body: PrescriptionBodyWidget(prescription: dummyData),
      button: FilledButton(
        onPressed: () {},
        child: const Row(
          children: [Text('Detail'), Icon(Icons.navigate_next)],
        ),
      ),
    );
  }
}
