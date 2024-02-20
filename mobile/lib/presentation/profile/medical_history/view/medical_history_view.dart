import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';

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
        decoration: InputDecoration(
          labelText: LocaleKeys.profile_medical.tr(),
          hintText: LocaleKeys.profile_medical_guiding.tr(),
          labelStyle: const TextStyle(color: Colors.black),
          border: InputBorder.none,
        ),
        maxLines: 12,
      ),
    );
  }
}
