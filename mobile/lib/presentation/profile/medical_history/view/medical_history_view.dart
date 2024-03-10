import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/widgets/profile_textformfield.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';

class MedicalHistoryView extends StatelessWidget {
  const MedicalHistoryView({super.key});

  @override
  Widget build(BuildContext context) {
    return MyView();
  }
}

class MyView extends StatelessWidget {
  MyView({super.key});

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  final medicalHistoryController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 350,
      child: Form(
        key: formKey,
        child: Column(
          children: [
            ProfileTextFormField(
              labelText: LocaleKeys.profile_medical.tr(),
              hintText: LocaleKeys.profile_medical_guiding.tr(),
              controller: medicalHistoryController,
              maxLines: 12,
              height: 200,
            ),
            Expanded(
              child: Stack(
                children: [
                  Positioned.fill(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        CustomButton(
                          text: LocaleKeys.action_save.tr(),
                          width: double.infinity,
                          height: 50,
                          textSize: 16,
                          color: context.themeConfig.categoryButtonColor,
                          onPressed: () {},
                        ),
                        const SizedBox(height: 8),
                        CustomButton(
                          text: LocaleKeys.action_back_to_home.tr(),
                          width: double.infinity,
                          height: 50,
                          textSize: 16,
                          color: context.themeConfig.categoryButtonColor,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
