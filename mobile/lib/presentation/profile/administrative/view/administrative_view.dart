import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/administrative/widgets/administrative_textformfield.dart';

class AdministrativeView extends StatelessWidget {
  const AdministrativeView({super.key});

  @override
  Widget build(BuildContext context) {
    return const MyView();
  }
}

class MyView extends StatelessWidget {
  const MyView({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 700,
      child: Column(
        children: [
          AdministrativeTextFormField(
            labelText: LocaleKeys.profile_name.tr(),
            hintText: LocaleKeys.profile_name_guiding.tr(),
          ),
          Row(
            children: [
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: LocaleKeys.profile_dob.tr(),
                  hintText: LocaleKeys.profile_dob_guiding.tr(),
                ),
              ),
              const SizedBox(width: 4),
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: LocaleKeys.profile_gender.tr(),
                  hintText: LocaleKeys.profile_gender_guiding.tr(),
                ),
              ),
            ],
          ),
          AdministrativeTextFormField(
            labelText: LocaleKeys.profile_citizen_id.tr(),
            hintText: LocaleKeys.profile_citizen_id_guiding.tr(),
          ),
          AdministrativeTextFormField(
            labelText: LocaleKeys.profile_insurance_id.tr(),
            hintText: LocaleKeys.profile_insurance_id_guiding.tr(),
          ),
          AdministrativeTextFormField(
            labelText: LocaleKeys.profile_address.tr(),
            hintText: LocaleKeys.profile_address_guiding.tr(),
          ),
          AdministrativeTextFormField(
            labelText: LocaleKeys.profile_occupation.tr(),
            hintText: LocaleKeys.profile_occupation_guiding.tr(),
          ),
          Row(
            children: [
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: LocaleKeys.profile_height.tr(),
                  hintText: LocaleKeys.profile_height_guiding.tr(),
                ),
              ),
              const SizedBox(width: 4),
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: LocaleKeys.profile_weight.tr(),
                  hintText: LocaleKeys.profile_weight_guiding.tr(),
                ),
              ),
            ],
          ),
          AdministrativeTextFormField(
            labelText: LocaleKeys.profile_check_up.tr(),
            hintText: LocaleKeys.profile_check_up_guiding.tr(),
          ),
        ],
      ),
    );
  }
}
