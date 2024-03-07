import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';

class CustomCategory extends StatelessWidget {
  const CustomCategory({
    super.key,
    required this.text,
  });

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Text(
        text,
        style: context.headlineSmall.copyWith(fontSize: 16),
      ),
    );
  }
}
