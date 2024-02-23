import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/custom_color.dart';

class ProfileIncompleteWidget extends StatelessWidget {
  const ProfileIncompleteWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final CustomColor customColor = Theme.of(context).extension<CustomColor>()!;
    return Container(
      decoration: BoxDecoration(
        color: customColor.primaryW100,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Profile is incomplete!',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  Text(
                    'Update your information for a better experience.',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ],
              ),
            ),
            FilledButton(
              onPressed: () {},
              child: const Text('Update'),
            )
          ],
        ),
      ),
    );
  }
}
