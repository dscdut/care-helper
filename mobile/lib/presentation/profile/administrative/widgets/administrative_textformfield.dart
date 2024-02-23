import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';

class AdministrativeTextFormField extends StatelessWidget {
  const AdministrativeTextFormField({
    super.key,
    required this.labelText,
    required this.hintText,
    required this.initialValue,
  });

  final String labelText;
  final String hintText;
  final String initialValue;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(
        horizontal: 8,
      ),
      height: 70,
      decoration: const BoxDecoration(
        color: ColorStyles.textFormBackgroundColor,
        borderRadius: BorderRadius.all(Radius.circular(8)),
      ),
      child: TextFormField(
        initialValue: initialValue == '' ? null : initialValue,
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
