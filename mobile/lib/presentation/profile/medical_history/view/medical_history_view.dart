import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:hive/hive.dart';

class MedicalHistoryView extends StatelessWidget {
  const MedicalHistoryView({super.key});

  @override
  Widget build(BuildContext context) {
    return const MyView();
  }
}

class MyView extends StatelessWidget {
  const MyView({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 8,
      ),
      decoration: const BoxDecoration(
        color: ColorStyles.textFormBackgroundColor,
        borderRadius: BorderRadius.all(Radius.circular(8)),
      ),
      child: TextFormField(
        style: const TextStyle(
          color: Colors.black,
        ),
        decoration: const InputDecoration(
          labelText: 'Medical History',
          hintText: 'Enter your medical history',
          labelStyle: TextStyle(color: Colors.black),
          border: InputBorder.none,
        ),
        maxLines: 12,
      ),
    );
  }
}
