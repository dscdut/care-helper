import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';

class InitialTextFormField extends StatelessWidget {
  const InitialTextFormField({
    super.key,
    required this.labelText,
    required this.hintText,
    required this.initial,
    this.controller,
  });

  final String labelText;
  final String hintText;
  final String initial;
  final TextEditingController? controller;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(
        horizontal: 8,
      ),
      height: 60,
      decoration: BoxDecoration(
        color: context.themeConfig.textFormBackgroundColor,
        borderRadius: const BorderRadius.all(Radius.circular(8)),
      ),
      child: TextFormField(
        initialValue: initial,
        controller: controller,
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
