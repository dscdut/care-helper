import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/home/widgets/card_template_widget.dart';
import 'package:flutter_template/presentation/home/widgets/diagnostic/diagnostic_body_widget.dart';
import 'package:flutter_template/presentation/home/widgets/error/no_diagnostic_widget.dart';

class DiagnosticWidget extends StatelessWidget {
  const DiagnosticWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return CardTemplateWidget(
      title: 'Diagnostic',
      // body: const NoDiagnosticWidget(),
      body: const DiagnosticBodyWidget(),
      button: FilledButton(
        onPressed: () {},
        child: const Row(
          children: [Text('Detail'), Icon(Icons.navigate_next)],
        ),
      ),
    );
  }
}
