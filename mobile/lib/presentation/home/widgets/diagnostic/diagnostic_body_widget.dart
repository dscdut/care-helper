import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/custom_color.dart';

class DiagnosticBodyWidget extends StatelessWidget {
  const DiagnosticBodyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final CustomColor customColor = Theme.of(context).extension<CustomColor>()!;
    return Card(
      color: customColor.primaryW100,
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Card(
              color: customColor.accent,
              elevation: 0,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Conclusion',
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall!
                          .copyWith(
                            color: Theme.of(context).scaffoldBackgroundColor,
                          ),
                    ),
                    const SizedBox(
                      width: 16,
                    ),
                    Flexible(
                      child: Text(
                        'Stable blood pressure',
                        style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                              color: Theme.of(context).scaffoldBackgroundColor,
                            ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(
              height: 24,
            ),
            Text(
              'Be mindful of any sudden changes in your blood pressure readings or any symptoms such as severe headaches, dizziness, chest pain, or shortness of breath. If you experience any of these symptoms, don\'t hesitate to reach out to me so we can address them promptly.',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
