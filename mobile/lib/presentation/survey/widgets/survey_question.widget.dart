import 'package:flutter/material.dart';

class SurveyQuestionWidget extends StatelessWidget {
  const SurveyQuestionWidget({super.key, required this.question});

  final String question;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFF112950),
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          question,
          style: Theme.of(context)
              .textTheme
              .headlineSmall!
              .copyWith(color: Theme.of(context).scaffoldBackgroundColor),
        ),
      ),
    );
  }
}
