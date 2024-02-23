import 'package:flutter/material.dart';

class CardTemplateWidget extends StatelessWidget {
  const CardTemplateWidget({
    super.key,
    required this.title,
    required this.body,
    this.button,
  });

  final String title;
  final Widget body;
  final Widget? button;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 6),
          child: Row(
            children: [
              Text(
                title,
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall!
                    .copyWith(fontWeight: FontWeight.w800),
              ),
              const Spacer(),
              if (button != null) button!,
            ],
          ),
        ),
        const SizedBox(
          height: 16,
        ),
        body,
      ],
    );
  }
}
