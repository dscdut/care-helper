import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';

class AdministrativeTextFormField extends StatelessWidget {
  const AdministrativeTextFormField({
    super.key,
    required this.labelText,
    required this.hintText,
  });

  final String labelText;
  final String hintText;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(
        horizontal: 8,
      ),
      height: 60,
      decoration: const BoxDecoration(
        color: ColorStyles.textFormBackgroundColor,
        borderRadius: BorderRadius.all(Radius.circular(8)),
      ),
      child: TextFormField(
        style: const TextStyle(
          color: Colors.black,
        ),
        decoration: InputDecoration(
          labelText: labelText,
          hintText: hintText,
          labelStyle: const TextStyle(
            color: Colors.black,
          ),
          border: InputBorder.none,
        ),
      ),
    );
  }
}
